import type {LoaderFunctionArgs, ActionFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, Link, Form, useNavigation, useActionData} from '@remix-run/react';
import {redirect} from '@shopify/remix-oxygen';
import {useState} from 'react';

export const meta: MetaFunction = () => {
  return [{title: 'My Addresses | Daily Loom'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (!customerAccessToken) {
    return redirect('/account/login');
  }

  const {customer} = await context.storefront.query(ADDRESSES_QUERY, {
    variables: {customerAccessToken},
  });

  if (!customer) {
    return redirect('/account/login');
  }

  return {
    addresses: customer.addresses?.nodes || [],
    defaultAddressId: customer.defaultAddress?.id,
  };
}

export async function action({request, context}: ActionFunctionArgs) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (!customerAccessToken) {
    return redirect('/account/login');
  }

  const formData = await request.formData();
  const action = formData.get('_action') as string;

  try {
    if (action === 'create' || action === 'update') {
      const address = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        address1: formData.get('address1') as string,
        address2: formData.get('address2') as string || '',
        city: formData.get('city') as string,
        province: formData.get('province') as string,
        zip: formData.get('zip') as string,
        country: formData.get('country') as string || 'India',
        phone: formData.get('phone') as string || '',
      };

      if (action === 'create') {
        const {customerAddressCreate} = await context.storefront.mutate(CREATE_ADDRESS_MUTATION, {
          variables: {customerAccessToken, address},
        });

        if (customerAddressCreate?.customerUserErrors?.length) {
          return {error: customerAddressCreate.customerUserErrors[0].message};
        }

        // Set as default if requested
        if (formData.get('setDefault') === 'true' && customerAddressCreate?.customerAddress?.id) {
          await context.storefront.mutate(SET_DEFAULT_ADDRESS_MUTATION, {
            variables: {
              customerAccessToken,
              addressId: customerAddressCreate.customerAddress.id,
            },
          });
        }
      } else {
        const addressId = formData.get('addressId') as string;
        const {customerAddressUpdate} = await context.storefront.mutate(UPDATE_ADDRESS_MUTATION, {
          variables: {customerAccessToken, id: addressId, address},
        });

        if (customerAddressUpdate?.customerUserErrors?.length) {
          return {error: customerAddressUpdate.customerUserErrors[0].message};
        }
      }

      return {success: true};
    }

    if (action === 'delete') {
      const addressId = formData.get('addressId') as string;
      const {customerAddressDelete} = await context.storefront.mutate(DELETE_ADDRESS_MUTATION, {
        variables: {customerAccessToken, id: addressId},
      });

      if (customerAddressDelete?.customerUserErrors?.length) {
        return {error: customerAddressDelete.customerUserErrors[0].message};
      }

      return {success: true};
    }

    if (action === 'setDefault') {
      const addressId = formData.get('addressId') as string;
      await context.storefront.mutate(SET_DEFAULT_ADDRESS_MUTATION, {
        variables: {customerAccessToken, addressId},
      });

      return {success: true};
    }
  } catch (error) {
    return {error: 'Something went wrong. Please try again.'};
  }

  return {};
}

export default function AddressesPage() {
  const {addresses, defaultAddressId} = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="pt-[44px] min-h-screen bg-[#FFF9F3]">
      <section className="py-12 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-8 fade-in-up">
            <div className="flex items-center gap-4">
              <Link to="/account" className="text-[#666666] hover:text-[#1A1A1A] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Link>
              <h1 className="font-['Playfair_Display'] text-[clamp(24px,4vw,32px)] text-[#1A1A1A] font-light">
                My Addresses
              </h1>
            </div>
            {!showForm && !editingAddress && (
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide hover:bg-[#2B2B2B] transition-colors"
              >
                Add New
              </button>
            )}
          </div>

          {actionData?.error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-[14px] rounded mb-6 fade-in-up">
              {actionData.error}
            </div>
          )}

          {/* Address Form */}
          {(showForm || editingAddress) && (
            <div className="bg-white border border-[rgba(0,0,0,0.06)] p-6 md:p-8 mb-6 fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Playfair_Display'] text-[20px] text-[#1A1A1A]">
                  {editingAddress ? 'Edit Address' : 'New Address'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingAddress(null);
                  }}
                  className="text-[#666666] hover:text-[#1A1A1A]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <Form method="post" className="space-y-4">
                <input type="hidden" name="_action" value={editingAddress ? 'update' : 'create'} />
                {editingAddress && <input type="hidden" name="addressId" value={editingAddress.id} />}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      defaultValue={editingAddress?.firstName || ''}
                      className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      required
                      defaultValue={editingAddress?.lastName || ''}
                      className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                    Address Line 1 *
                  </label>
                  <input
                    name="address1"
                    type="text"
                    required
                    defaultValue={editingAddress?.address1 || ''}
                    className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none"
                    placeholder="House/Flat No., Building Name, Street"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                    Address Line 2
                  </label>
                  <input
                    name="address2"
                    type="text"
                    defaultValue={editingAddress?.address2 || ''}
                    className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none"
                    placeholder="Area, Landmark (Optional)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                      City *
                    </label>
                    <input
                      name="city"
                      type="text"
                      required
                      defaultValue={editingAddress?.city || ''}
                      className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                      State *
                    </label>
                    <input
                      name="province"
                      type="text"
                      required
                      defaultValue={editingAddress?.province || ''}
                      className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                      PIN Code *
                    </label>
                    <input
                      name="zip"
                      type="text"
                      required
                      defaultValue={editingAddress?.zip || ''}
                      className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                      Country
                    </label>
                    <input
                      name="country"
                      type="text"
                      defaultValue={editingAddress?.country || 'India'}
                      className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    defaultValue={editingAddress?.phone || ''}
                    className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {!editingAddress && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="setDefault" value="true" className="w-4 h-4 accent-[#6B8E72]" />
                    <span className="text-[14px] text-[#666666]">Set as default address</span>
                  </label>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide hover:bg-[#2B2B2B] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingAddress(null);
                    }}
                    className="px-6 py-3 border border-[#ccc] text-[#666666] text-[13px] font-medium tracking-wide hover:border-[#1A1A1A] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </div>
          )}

          {/* Addresses List */}
          {addresses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4 fade-in-up delay-200">
              {addresses.map((address: any) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  isDefault={address.id === defaultAddressId}
                  onEdit={() => setEditingAddress(address)}
                />
              ))}
            </div>
          ) : !showForm && (
            <div className="text-center py-16 fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#f5f0eb] rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h2 className="font-['Playfair_Display'] text-[24px] text-[#1A1A1A] mb-4">No addresses saved</h2>
              <p className="text-[#666666] mb-8 text-[15px]">Add an address for faster checkout.</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-block px-8 py-3 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase hover:bg-[#2B2B2B] transition-colors"
              >
                Add Address
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function AddressCard({address, isDefault, onEdit}: {address: any; isDefault: boolean; onEdit: () => void}) {
  const navigation = useNavigation();
  const isDeleting = navigation.formData?.get('addressId') === address.id && navigation.formData?.get('_action') === 'delete';

  return (
    <div className={`bg-white border p-6 ${isDefault ? 'border-[#6B8E72]' : 'border-[rgba(0,0,0,0.06)]'}`}>
      {isDefault && (
        <span className="inline-block px-2 py-1 bg-[#6B8E72] text-white text-[10px] font-medium uppercase tracking-wide mb-3">
          Default
        </span>
      )}
      <address className="not-italic text-[14px] text-[#666666] leading-relaxed mb-4">
        <span className="font-medium text-[#1A1A1A]">{address.firstName} {address.lastName}</span><br />
        {address.address1}<br />
        {address.address2 && <>{address.address2}<br /></>}
        {address.city}, {address.province} {address.zip}<br />
        {address.country}
        {address.phone && <><br />{address.phone}</>}
      </address>

      <div className="flex items-center gap-4 pt-4 border-t border-[rgba(0,0,0,0.06)]">
        <button
          onClick={onEdit}
          className="text-[13px] text-[#6B8E72] font-medium hover:underline"
        >
          Edit
        </button>

        {!isDefault && (
          <Form method="post" className="inline">
            <input type="hidden" name="_action" value="setDefault" />
            <input type="hidden" name="addressId" value={address.id} />
            <button
              type="submit"
              className="text-[13px] text-[#666666] hover:text-[#1A1A1A] hover:underline"
            >
              Set as Default
            </button>
          </Form>
        )}

        <Form method="post" className="inline ml-auto">
          <input type="hidden" name="_action" value="delete" />
          <input type="hidden" name="addressId" value={address.id} />
          <button
            type="submit"
            disabled={isDeleting}
            className="text-[13px] text-red-500 hover:underline disabled:opacity-50"
            onClick={(e) => {
              if (!confirm('Are you sure you want to delete this address?')) {
                e.preventDefault();
              }
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </Form>
      </div>
    </div>
  );
}

const ADDRESSES_QUERY = `#graphql
  query CustomerAddresses($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        id
      }
      addresses(first: 20) {
        nodes {
          id
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
      }
    }
  }
`;

const CREATE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const UPDATE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const DELETE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      deletedCustomerAddressId
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const SET_DEFAULT_ADDRESS_MUTATION = `#graphql
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
