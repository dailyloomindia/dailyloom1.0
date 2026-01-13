import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {redirect} from '@shopify/remix-oxygen';
import {Image, Money} from '@shopify/hydrogen';

export const meta: MetaFunction = () => {
  return [{title: 'My Orders | Daily Loom'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (!customerAccessToken) {
    return redirect('/account/login');
  }

  const {customer} = await context.storefront.query(ORDERS_QUERY, {
    variables: {customerAccessToken},
  });

  if (!customer) {
    return redirect('/account/login');
  }

  return {orders: customer.orders?.nodes || []};
}

export default function OrdersPage() {
  const {orders} = useLoaderData<typeof loader>();

  return (
    <div className="pt-[44px] min-h-screen bg-[#FFF9F3]">
      <section className="py-12 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 fade-in-up">
            <Link to="/account" className="text-[#666666] hover:text-[#1A1A1A] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
            <h1 className="font-['Playfair_Display'] text-[clamp(24px,4vw,32px)] text-[#1A1A1A] font-light">
              My Orders
            </h1>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4 fade-in-up delay-200">
              {orders.map((order: any, index: number) => (
                <OrderCard key={order.id} order={order} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#f5f0eb] rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h2 className="font-['Playfair_Display'] text-[24px] text-[#1A1A1A] mb-4">No orders yet</h2>
              <p className="text-[#666666] mb-8 text-[15px]">
                When you place an order, it will appear here.
              </p>
              <Link
                to="/store"
                className="inline-block px-8 py-3 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase hover:bg-[#2B2B2B] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function OrderCard({order, index}: {order: any; index: number}) {
  const fulfillmentStatus = order.fulfillmentStatus || 'UNFULFILLED';
  const statusColors: Record<string, string> = {
    FULFILLED: 'bg-green-100 text-green-700',
    UNFULFILLED: 'bg-yellow-100 text-yellow-700',
    PARTIALLY_FULFILLED: 'bg-blue-100 text-blue-700',
    IN_TRANSIT: 'bg-blue-100 text-blue-700',
    DELIVERED: 'bg-green-100 text-green-700',
  };

  const lineItems = order.lineItems?.nodes || [];
  const totalItems = lineItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
  const orderId = order.id.split('/').pop();

  return (
    <div
      className="bg-white border border-[rgba(0,0,0,0.06)] overflow-hidden fade-in-up"
      style={{animationDelay: `${index * 50}ms`}}
    >
      {/* Order Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-6 border-b border-[rgba(0,0,0,0.06)] bg-[#faf8f5]">
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <div>
            <p className="text-[12px] text-[#999] uppercase tracking-wide mb-1">Order Number</p>
            <p className="font-medium text-[#1A1A1A]">#{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-[12px] text-[#999] uppercase tracking-wide mb-1">Date</p>
            <p className="text-[#1A1A1A]">
              {new Date(order.processedAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[#999] uppercase tracking-wide mb-1">Total</p>
            <p className="font-medium text-[#1A1A1A]">
              <Money data={order.totalPrice} />
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 text-[11px] font-medium uppercase tracking-wide rounded ${statusColors[fulfillmentStatus] || 'bg-gray-100 text-gray-700'}`}>
          {fulfillmentStatus.replace('_', ' ')}
        </span>
      </div>

      {/* Order Items */}
      <div className="p-4 md:p-6">
        <div className="flex flex-wrap gap-4 mb-4">
          {lineItems.slice(0, 4).map((item: any, i: number) => (
            <div key={i} className="flex gap-3">
              {item.variant?.image && (
                <div className="w-16 h-20 bg-[#f5f0eb] flex-shrink-0 overflow-hidden">
                  <Image data={item.variant.image} className="w-full h-full object-cover" sizes="64px" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-[14px] text-[#1A1A1A] font-medium line-clamp-1">{item.title}</p>
                <p className="text-[13px] text-[#666666]">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
          {lineItems.length > 4 && (
            <div className="flex items-center text-[13px] text-[#666666]">
              +{lineItems.length - 4} more items
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[rgba(0,0,0,0.06)]">
          <p className="text-[13px] text-[#666666]">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          <Link
            to={`/account/orders/${orderId}`}
            className="flex items-center gap-2 text-[13px] text-[#6B8E72] font-medium hover:underline"
          >
            View Order
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

const ORDERS_QUERY = `#graphql
  query CustomerOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 50, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          orderNumber
          processedAt
          financialStatus
          fulfillmentStatus
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 10) {
            nodes {
              title
              quantity
              variant {
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;
