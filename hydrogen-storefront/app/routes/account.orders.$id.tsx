import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {redirect} from '@shopify/remix-oxygen';
import {Image, Money} from '@shopify/hydrogen';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Order #${data?.order?.orderNumber || ''} | Daily Loom`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  const {id} = params;

  if (!customerAccessToken) {
    return redirect('/account/login');
  }

  const orderId = `gid://shopify/Order/${id}`;

  const {customer} = await context.storefront.query(ORDER_QUERY, {
    variables: {customerAccessToken},
  });

  if (!customer) {
    return redirect('/account/login');
  }

  const order = customer.orders?.nodes?.find((o: any) => o.id === orderId);

  if (!order) {
    throw new Response('Order not found', {status: 404});
  }

  return {order};
}

export default function OrderDetailPage() {
  const {order} = useLoaderData<typeof loader>();

  const fulfillmentStatus = order.fulfillmentStatus || 'UNFULFILLED';
  const financialStatus = order.financialStatus || 'PENDING';
  const lineItems = order.lineItems?.nodes || [];
  const shippingAddress = order.shippingAddress;
  const fulfillments = order.successfulFulfillments || [];

  // Tracking info from fulfillments
  const trackingInfo = fulfillments.length > 0 ? fulfillments[0].trackingInfo?.[0] : null;

  const statusSteps = [
    {key: 'CONFIRMED', label: 'Order Confirmed', icon: '✓'},
    {key: 'PROCESSING', label: 'Processing', icon: '📦'},
    {key: 'SHIPPED', label: 'Shipped', icon: '🚚'},
    {key: 'DELIVERED', label: 'Delivered', icon: '🏠'},
  ];

  const currentStepIndex = fulfillmentStatus === 'FULFILLED' || fulfillmentStatus === 'DELIVERED'
    ? 3
    : fulfillmentStatus === 'IN_TRANSIT'
    ? 2
    : fulfillmentStatus === 'PARTIALLY_FULFILLED'
    ? 1
    : 0;

  return (
    <div className="pt-[44px] min-h-screen bg-[#FFF9F3]">
      <section className="py-12 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 fade-in-up">
            <Link to="/account/orders" className="text-[#666666] hover:text-[#1A1A1A] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
            <div>
              <h1 className="font-['Playfair_Display'] text-[clamp(24px,4vw,32px)] text-[#1A1A1A] font-light">
                Order #{order.orderNumber}
              </h1>
              <p className="text-[#666666] text-[14px] mt-1">
                Placed on {new Date(order.processedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Order Tracking Progress */}
          <div className="bg-white border border-[rgba(0,0,0,0.06)] p-6 md:p-8 mb-6 fade-in-up delay-200">
            <h2 className="font-['Playfair_Display'] text-[20px] text-[#1A1A1A] mb-6">Order Status</h2>

            {/* Progress Bar */}
            <div className="relative mb-8">
              <div className="flex justify-between items-center">
                {statusSteps.map((step, index) => (
                  <div key={step.key} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${
                        index <= currentStepIndex
                          ? 'bg-[#6B8E72] text-white'
                          : 'bg-[#e5e5e5] text-[#999]'
                      }`}
                    >
                      {index < currentStepIndex ? '✓' : step.icon}
                    </div>
                    <p className={`text-[12px] mt-2 text-center ${
                      index <= currentStepIndex ? 'text-[#1A1A1A] font-medium' : 'text-[#999]'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
              {/* Progress Line */}
              <div className="absolute top-5 left-[5%] right-[5%] h-[2px] bg-[#e5e5e5] -z-0">
                <div
                  className="h-full bg-[#6B8E72] transition-all duration-500"
                  style={{width: `${(currentStepIndex / 3) * 100}%`}}
                />
              </div>
            </div>

            {/* Tracking Info */}
            {trackingInfo && (
              <div className="bg-[#f5f0eb] p-4 rounded">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[12px] text-[#999] uppercase tracking-wide mb-1">Tracking Number</p>
                    <p className="font-medium text-[#1A1A1A] font-mono">{trackingInfo.number}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#999] uppercase tracking-wide mb-1">Carrier</p>
                    <p className="text-[#1A1A1A]">{trackingInfo.company || 'Shipping Partner'}</p>
                  </div>
                  {trackingInfo.url && (
                    <a
                      href={trackingInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide hover:bg-[#2B2B2B] transition-colors"
                    >
                      Track Shipment →
                    </a>
                  )}
                </div>
              </div>
            )}

            {!trackingInfo && fulfillmentStatus !== 'UNFULFILLED' && (
              <p className="text-[#666666] text-[14px]">
                Tracking information will be available once your order ships.
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="md:col-span-2 bg-white border border-[rgba(0,0,0,0.06)] p-6 md:p-8 fade-in-up delay-200">
              <h2 className="font-['Playfair_Display'] text-[20px] text-[#1A1A1A] mb-6">Items</h2>
              <div className="space-y-4">
                {lineItems.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4 pb-4 border-b border-[rgba(0,0,0,0.06)] last:border-0 last:pb-0">
                    {item.variant?.image && (
                      <div className="w-20 h-24 bg-[#f5f0eb] flex-shrink-0 overflow-hidden">
                        <Image data={item.variant.image} className="w-full h-full object-cover" sizes="80px" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.variant?.product?.handle || ''}`}
                        className="text-[15px] text-[#1A1A1A] font-medium hover:text-[#6B8E72] transition-colors line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      {item.variant?.title && item.variant.title !== 'Default Title' && (
                        <p className="text-[13px] text-[#666666] mt-1">{item.variant.title}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[13px] text-[#666666]">Qty: {item.quantity}</p>
                        <p className="text-[14px] font-medium text-[#1A1A1A]">
                          <Money data={item.originalTotalPrice} />
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary & Address */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white border border-[rgba(0,0,0,0.06)] p-6 fade-in-up delay-200">
                <h3 className="font-['Playfair_Display'] text-[18px] text-[#1A1A1A] mb-4">Summary</h3>
                <div className="space-y-3 text-[14px]">
                  <div className="flex justify-between text-[#666666]">
                    <span>Subtotal</span>
                    <Money data={order.subtotalPrice} className="text-[#1A1A1A]" />
                  </div>
                  <div className="flex justify-between text-[#666666]">
                    <span>Shipping</span>
                    <Money data={order.totalShippingPrice} className="text-[#1A1A1A]" />
                  </div>
                  <div className="flex justify-between text-[#666666]">
                    <span>Tax</span>
                    <Money data={order.totalTax} className="text-[#1A1A1A]" />
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[rgba(0,0,0,0.08)] font-medium text-[#1A1A1A]">
                    <span>Total</span>
                    <Money data={order.totalPrice} />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[rgba(0,0,0,0.08)]">
                  <p className="text-[12px] text-[#999] uppercase tracking-wide mb-1">Payment Status</p>
                  <span className={`inline-block px-2 py-1 text-[11px] font-medium uppercase tracking-wide rounded ${
                    financialStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {financialStatus}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              {shippingAddress && (
                <div className="bg-white border border-[rgba(0,0,0,0.06)] p-6 fade-in-up delay-200">
                  <h3 className="font-['Playfair_Display'] text-[18px] text-[#1A1A1A] mb-4">Shipping Address</h3>
                  <address className="not-italic text-[14px] text-[#666666] leading-relaxed">
                    {shippingAddress.firstName} {shippingAddress.lastName}<br />
                    {shippingAddress.address1}<br />
                    {shippingAddress.address2 && <>{shippingAddress.address2}<br /></>}
                    {shippingAddress.city}, {shippingAddress.province} {shippingAddress.zip}<br />
                    {shippingAddress.country}
                    {shippingAddress.phone && (
                      <>
                        <br /><br />
                        <span className="text-[#1A1A1A]">Phone:</span> {shippingAddress.phone}
                      </>
                    )}
                  </address>
                </div>
              )}

              {/* Need Help */}
              <div className="bg-white border border-[rgba(0,0,0,0.06)] p-6 fade-in-up delay-200">
                <h3 className="font-['Playfair_Display'] text-[18px] text-[#1A1A1A] mb-4">Need Help?</h3>
                <p className="text-[14px] text-[#666666] mb-4">
                  Contact us for any questions about your order.
                </p>
                <a
                  href="mailto:support@dailyloom.in"
                  className="inline-flex items-center gap-2 text-[13px] text-[#6B8E72] font-medium hover:underline"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  support@dailyloom.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const ORDER_QUERY = `#graphql
  query CustomerOrder($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 100, sortKey: PROCESSED_AT, reverse: true) {
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
          subtotalPrice {
            amount
            currencyCode
          }
          totalShippingPrice {
            amount
            currencyCode
          }
          totalTax {
            amount
            currencyCode
          }
          shippingAddress {
            firstName
            lastName
            address1
            address2
            city
            province
            zip
            country
            phone
          }
          lineItems(first: 20) {
            nodes {
              title
              quantity
              originalTotalPrice {
                amount
                currencyCode
              }
              variant {
                title
                image {
                  url
                  altText
                  width
                  height
                }
                product {
                  handle
                }
              }
            }
          }
          successfulFulfillments(first: 5) {
            trackingInfo {
              number
              url
              company
            }
          }
        }
      }
    }
  }
`;
