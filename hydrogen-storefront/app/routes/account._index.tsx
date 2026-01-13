import type {LoaderFunctionArgs, ActionFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, Link, Form, useNavigation} from '@remix-run/react';
import {redirect} from '@shopify/remix-oxygen';
import {Image, Money} from '@shopify/hydrogen';

export const meta: MetaFunction = () => {
  return [{title: 'My Account | Daily Loom'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (!customerAccessToken) {
    return redirect('/account/login');
  }

  try {
    const {customer} = await context.storefront.query(CUSTOMER_QUERY, {
      variables: {customerAccessToken},
    });

    if (!customer) {
      context.session.unset('customerAccessToken');
      return redirect('/account/login', {
        headers: {'Set-Cookie': await context.session.commit()},
      });
    }

    return {customer};
  } catch (error) {
    context.session.unset('customerAccessToken');
    return redirect('/account/login', {
      headers: {'Set-Cookie': await context.session.commit()},
    });
  }
}

export async function action({request, context}: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get('action');

  if (action === 'logout') {
    context.session.unset('customerAccessToken');
    return redirect('/account/login', {
      headers: {'Set-Cookie': await context.session.commit()},
    });
  }

  return {};
}

export default function AccountDashboard() {
  const {customer} = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isLoggingOut = navigation.formData?.get('action') === 'logout';

  const recentOrders = customer.orders?.nodes?.slice(0, 3) || [];
  const defaultAddress = customer.defaultAddress;

  return (
    <div className="pt-[44px] min-h-screen bg-[#FFF9F3]">
      <section className="py-12 md:py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 fade-in-up">
            <div>
              <h1 className="font-['Playfair_Display'] text-[clamp(28px,5vw,40px)] text-[#1A1A1A] font-light">
                Welcome, {customer.firstName || 'Guest'}
              </h1>
              <p className="text-[#666666] text-[15px] mt-1">{customer.email}</p>
            </div>
            <Form method="post">
              <input type="hidden" name="action" value="logout" />
              <button
                type="submit"
                disabled={isLoggingOut}
                className="px-6 py-2 border border-[#ccc] text-[#666666] text-[13px] font-medium tracking-wide hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? 'Signing out...' : 'Sign Out'}
              </button>
            </Form>
          </div>

          {/* Dashboard Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Recent Orders */}
            <div className="md:col-span-2 bg-white border border-[rgba(0,0,0,0.06)] p-6 md:p-8 fade-in-up delay-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Playfair_Display'] text-[20px] text-[#1A1A1A]">Recent Orders</h2>
                <Link to="/account/orders" className="text-[13px] text-[#6B8E72] hover:underline">
                  View All
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order: any) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#f5f0eb] rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <p className="text-[#666666] text-[15px] mb-4">No orders yet</p>
                  <Link
                    to="/store"
                    className="inline-block px-6 py-2 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide hover:bg-[#2B2B2B] transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Menu */}
              <div className="bg-white border border-[rgba(0,0,0,0.06)] p-6 fade-in-up delay-200">
                <h3 className="font-['Playfair_Display'] text-[18px] text-[#1A1A1A] mb-4">Account</h3>
                <nav className="space-y-3">
                  {[
                    {title: 'Orders', href: '/account/orders', icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'},
                    {title: 'Addresses', href: '/account/addresses', icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'},
                    {title: 'Profile', href: '/account/profile', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'},
                  ].map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-3 p-3 text-[14px] text-[#2B2B2B] hover:bg-[#f5f0eb] transition-colors rounded"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={item.icon} />
                      </svg>
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Default Address */}
              <div className="bg-white border border-[rgba(0,0,0,0.06)] p-6 fade-in-up delay-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-['Playfair_Display'] text-[18px] text-[#1A1A1A]">Default Address</h3>
                  <Link to="/account/addresses" className="text-[12px] text-[#6B8E72] hover:underline">
                    Edit
                  </Link>
                </div>
                {defaultAddress ? (
                  <address className="not-italic text-[14px] text-[#666666] leading-relaxed">
                    {defaultAddress.firstName} {defaultAddress.lastName}<br />
                    {defaultAddress.address1}<br />
                    {defaultAddress.address2 && <>{defaultAddress.address2}<br /></>}
                    {defaultAddress.city}, {defaultAddress.province} {defaultAddress.zip}<br />
                    {defaultAddress.country}
                  </address>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-[#999] text-[14px] mb-3">No address saved</p>
                    <Link to="/account/addresses" className="text-[13px] text-[#6B8E72] hover:underline">
                      Add Address
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function OrderCard({order}: {order: any}) {
  const fulfillmentStatus = order.fulfillmentStatus || 'UNFULFILLED';
  const statusColors: Record<string, string> = {
    FULFILLED: 'bg-green-100 text-green-700',
    UNFULFILLED: 'bg-yellow-100 text-yellow-700',
    PARTIALLY_FULFILLED: 'bg-blue-100 text-blue-700',
    IN_TRANSIT: 'bg-blue-100 text-blue-700',
    DELIVERED: 'bg-green-100 text-green-700',
  };

  const lineItem = order.lineItems?.nodes?.[0];
  const image = lineItem?.variant?.image;
  const orderNumber = order.orderNumber;
  const orderId = order.id.split('/').pop();

  return (
    <Link
      to={`/account/orders/${orderId}`}
      className="flex gap-4 p-4 border border-[rgba(0,0,0,0.06)] hover:border-[#6B8E72] transition-colors group"
    >
      {image && (
        <div className="w-16 h-20 bg-[#f5f0eb] flex-shrink-0 overflow-hidden">
          <Image data={image} className="w-full h-full object-cover" sizes="64px" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-medium text-[#1A1A1A] text-[14px]">Order #{orderNumber}</p>
          <span className={`px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide rounded ${statusColors[fulfillmentStatus] || 'bg-gray-100 text-gray-700'}`}>
            {fulfillmentStatus.replace('_', ' ')}
          </span>
        </div>
        <p className="text-[13px] text-[#666666] mb-1">
          {new Date(order.processedAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <p className="text-[14px] text-[#1A1A1A] font-medium">
          <Money data={order.totalPrice} />
        </p>
      </div>
      <div className="self-center text-[#999] group-hover:text-[#6B8E72] transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </Link>
  );
}

const CUSTOMER_QUERY = `#graphql
  query CustomerDetails($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      defaultAddress {
        id
        firstName
        lastName
        address1
        address2
        city
        province
        zip
        country
      }
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
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
          lineItems(first: 1) {
            nodes {
              title
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
