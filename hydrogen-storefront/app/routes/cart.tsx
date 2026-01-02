import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {Image, Money, CartForm} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import {fadeInUp, staggerContainer} from '~/components/animations/PageTransition';

export const meta: MetaFunction = () => {
  return [{title: 'Cart | Daily Loom'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const cart = await context.cart.get();
  return {cart};
}

export default function CartPage() {
  const {cart} = useLoaderData<typeof loader>();
  const lines = cart?.lines?.nodes || [];
  const isEmpty = lines.length === 0;

  return (
    <div className="pt-24 min-h-screen">
      <section className="section-padding">
        <div className="container-premium">
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="font-display text-display-lg text-charcoal-950 mb-12 text-center"
          >
            Your Cart
          </motion.h1>

          {isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="divide-y divide-charcoal-100"
                >
                  {lines.map((line: any, index: number) => (
                    <CartLineItem key={line.id} line={line} index={index} />
                  ))}
                </motion.div>
              </div>

              {/* Order Summary */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="lg:sticky lg:top-32 lg:self-start"
              >
                <div className="bg-cream-100 p-6 md:p-8">
                  <h2 className="font-display text-xl text-charcoal-950 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-charcoal-600">
                      <span>Subtotal</span>
                      <Money data={cart.cost?.subtotalAmount} />
                    </div>
                    <div className="flex justify-between text-charcoal-600">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-charcoal-200 pt-4 mb-6">
                    <div className="flex justify-between text-lg font-medium text-charcoal-950">
                      <span>Total</span>
                      <Money data={cart.cost?.totalAmount} />
                    </div>
                  </div>

                  <a
                    href={cart.checkoutUrl}
                    className="block w-full btn-primary text-center"
                  >
                    Checkout
                  </a>

                  <p className="text-xs text-charcoal-500 text-center mt-4">
                    Taxes and shipping calculated at checkout
                  </p>

                  <div className="mt-6 pt-6 border-t border-charcoal-200">
                    <p className="text-sm text-charcoal-600 mb-2">We Accept</p>
                    <div className="flex gap-2">
                      {['Visa', 'MC', 'Amex', 'PayPal'].map((card) => (
                        <span
                          key={card}
                          className="px-2 py-1 bg-cream-50 text-2xs text-charcoal-500 border border-charcoal-200"
                        >
                          {card}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
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

  return (
    <motion.div
      variants={fadeInUp}
      className="flex gap-6 py-6"
    >
      {/* Image */}
      <Link
        to={`/products/${product.handle}`}
        className="flex-shrink-0 w-24 h-32 bg-cream-100 overflow-hidden"
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
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between mb-2">
          <Link
            to={`/products/${product.handle}`}
            className="font-display text-lg text-charcoal-950 hover:text-primary-600 transition-colors"
          >
            {product.title}
          </Link>
          <Money
            data={line.cost.totalAmount}
            className="font-medium text-charcoal-950"
          />
        </div>

        {merchandise.title !== 'Default Title' && (
          <p className="text-sm text-charcoal-500 mb-2">{merchandise.title}</p>
        )}

        <div className="mt-auto flex items-center justify-between">
          {/* Quantity Controls */}
          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesUpdate}
            inputs={{
              lines: [
                {
                  id: line.id,
                  quantity: quantity,
                },
              ],
            }}
          >
            <div className="flex items-center border border-charcoal-300">
              <button
                type="submit"
                name="quantity"
                value={quantity - 1}
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center text-charcoal-600 hover:bg-charcoal-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-sm border-x border-charcoal-300">
                {quantity}
              </span>
              <button
                type="submit"
                name="quantity"
                value={quantity + 1}
                className="w-8 h-8 flex items-center justify-center text-charcoal-600 hover:bg-charcoal-50"
              >
                +
              </button>
            </div>
          </CartForm>

          {/* Remove */}
          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesRemove}
            inputs={{lineIds: [line.id]}}
          >
            <button
              type="submit"
              className="text-sm text-charcoal-500 hover:text-charcoal-950 underline-premium"
            >
              Remove
            </button>
          </CartForm>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyCart() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="text-center py-16"
    >
      <div className="w-24 h-24 mx-auto mb-6 bg-cream-100 rounded-full flex items-center justify-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-charcoal-400"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>
      <h2 className="font-display text-2xl text-charcoal-950 mb-4">
        Your cart is empty
      </h2>
      <p className="text-charcoal-600 mb-8">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link to="/collections/all" className="btn-primary">
        Continue Shopping
      </Link>
    </motion.div>
  );
}
