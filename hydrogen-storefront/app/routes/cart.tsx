import type {LoaderFunctionArgs, ActionFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, Link, useFetcher} from '@remix-run/react';
import {Image, Money, CartForm} from '@shopify/hydrogen';

export const meta: MetaFunction = () => {
  return [{title: 'Cart | Daily Loom'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const cart = await context.cart.get();
  return {cart};
}

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;
  const formData = await request.formData();
  const action = formData.get('action');

  if (action === 'remove') {
    const lineId = formData.get('lineId') as string;
    const result = await cart.removeLines([lineId]);
    return {success: true, cart: result};
  }

  if (action === 'update') {
    const lineId = formData.get('lineId') as string;
    const quantity = parseInt(formData.get('quantity') as string);
    const result = await cart.updateLines([{id: lineId, quantity}]);
    return {success: true, cart: result};
  }

  return {success: false};
}

export default function CartPage() {
  const {cart} = useLoaderData<typeof loader>();
  const lines = cart?.lines?.nodes || [];
  const isEmpty = lines.length === 0;

  return (
    <div className="pt-[44px] min-h-screen">
      <section className="py-12 md:py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <h1 className="font-['Playfair_Display'] text-[clamp(28px,5vw,40px)] text-[#1A1A1A] mb-10 text-center font-light fade-in-up">
            Your Cart
          </h1>

          {isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="divide-y divide-[rgba(0,0,0,0.06)]">
                  {lines.map((line: any, index: number) => (
                    <CartLineItem key={line.id} line={line} index={index} />
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-20 lg:self-start fade-in-up delay-200">
                <div className="bg-[#FFF9F3] border border-[rgba(0,0,0,0.06)] p-6 md:p-8">
                  <h2 className="font-['Playfair_Display'] text-[20px] text-[#1A1A1A] mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-[14px] text-[#666666]">
                      <span>Subtotal</span>
                      <Money data={cart.cost?.subtotalAmount} className="text-[#1A1A1A]" />
                    </div>
                    <div className="flex justify-between text-[14px] text-[#666666]">
                      <span>Shipping</span>
                      <span className="text-[#1A1A1A]">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-[rgba(0,0,0,0.08)] pt-4 mb-6">
                    <div className="flex justify-between text-[16px] font-medium text-[#1A1A1A]">
                      <span>Total</span>
                      <Money data={cart.cost?.totalAmount} />
                    </div>
                  </div>

                  <a
                    href={cart.checkoutUrl}
                    className="block w-full py-4 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase text-center hover:bg-[#2B2B2B] transition-colors"
                  >
                    Checkout
                  </a>

                  <p className="text-[12px] text-[#999] text-center mt-4">
                    Taxes and shipping calculated at checkout
                  </p>

                  <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.08)]">
                    <p className="text-[13px] text-[#666666] mb-3">Secure Payment</p>
                    <div className="flex gap-2">
                      {['Visa', 'Mastercard', 'Amex', 'UPI'].map((card) => (
                        <span
                          key={card}
                          className="px-2 py-1 bg-white text-[10px] text-[#666666] border border-[rgba(0,0,0,0.08)] rounded"
                        >
                          {card}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CartLineItem({line, index}: {line: any; index: number}) {
  const {merchandise, quantity} = line;
  const product = merchandise.product;
  const image = merchandise.image || product.featuredImage;
  const fetcher = useFetcher();

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    fetcher.submit(
      {action: 'update', lineId: line.id, quantity: newQuantity.toString()},
      {method: 'post'}
    );
  };

  const handleRemove = () => {
    fetcher.submit(
      {action: 'remove', lineId: line.id},
      {method: 'post'}
    );
  };

  return (
    <div
      className="flex gap-4 md:gap-6 py-6 fade-in-up"
      style={{animationDelay: `${index * 50}ms`}}
    >
      {/* Image */}
      <Link
        to={`/products/${product.handle}`}
        className="flex-shrink-0 w-20 h-28 md:w-24 md:h-32 bg-[#f5f0eb] overflow-hidden"
      >
        {image && (
          <Image
            data={image}
            className="w-full h-full object-cover"
            sizes="96px"
          />
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between gap-4 mb-2">
          <Link
            to={`/products/${product.handle}`}
            className="font-['Playfair_Display'] text-[16px] md:text-[18px] text-[#1A1A1A] hover:text-[#6B8E72] transition-colors truncate"
          >
            {product.title}
          </Link>
          <Money
            data={line.cost.totalAmount}
            className="font-medium text-[#1A1A1A] text-[15px] flex-shrink-0"
          />
        </div>

        {merchandise.title !== 'Default Title' && (
          <p className="text-[13px] text-[#666666] mb-2">{merchandise.title}</p>
        )}

        <div className="mt-auto flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center border border-[#ccc]">
            <button
              onClick={() => handleUpdateQuantity(quantity - 1)}
              disabled={quantity <= 1 || fetcher.state !== 'idle'}
              className="w-8 h-8 flex items-center justify-center text-[#666666] hover:bg-[#f5f0eb] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-[13px] border-x border-[#ccc]">
              {quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(quantity + 1)}
              disabled={fetcher.state !== 'idle'}
              className="w-8 h-8 flex items-center justify-center text-[#666666] hover:bg-[#f5f0eb] disabled:opacity-50 transition-colors"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={handleRemove}
            disabled={fetcher.state !== 'idle'}
            className="text-[13px] text-[#999] hover:text-[#1A1A1A] underline transition-colors disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="text-center py-16 fade-in-up">
      <div className="w-20 h-20 mx-auto mb-6 bg-[#f5f0eb] rounded-full flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#999"
          strokeWidth="1.2"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>
      <h2 className="font-['Playfair_Display'] text-[24px] text-[#1A1A1A] mb-4">
        Your cart is empty
      </h2>
      <p className="text-[#666666] mb-8 text-[15px]">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link
        to="/collections/all"
        className="inline-block px-8 py-3 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase hover:bg-[#2B2B2B] transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
