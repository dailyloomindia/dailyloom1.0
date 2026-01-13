import type {ActionFunctionArgs, LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {Form, Link, useActionData, useNavigation} from '@remix-run/react';
import {redirect} from '@shopify/remix-oxygen';

export const meta: MetaFunction = () => {
  return [{title: 'Create Account | Daily Loom'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect('/account');
  }
  return {};
}

export async function action({request, context}: ActionFunctionArgs) {
  const formData = await request.formData();
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const phone = formData.get('phone') as string;

  if (!email || !password || !firstName) {
    return {error: 'Please fill in all required fields.'};
  }

  if (password.length < 8) {
    return {error: 'Password must be at least 8 characters.'};
  }

  try {
    const {customerCreate} = await context.storefront.mutate(REGISTER_MUTATION, {
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password,
          phone: phone || undefined,
          acceptsMarketing: true,
        },
      },
    });

    if (customerCreate?.customerUserErrors?.length) {
      const error = customerCreate.customerUserErrors[0];
      return {error: error.message || 'Registration failed. Please try again.'};
    }

    // Auto-login after registration
    const {customerAccessTokenCreate} = await context.storefront.mutate(LOGIN_MUTATION, {
      variables: {input: {email, password}},
    });

    const accessToken = customerAccessTokenCreate?.customerAccessToken?.accessToken;
    if (accessToken) {
      context.session.set('customerAccessToken', accessToken);
      return redirect('/account', {
        headers: {
          'Set-Cookie': await context.session.commit(),
        },
      });
    }

    return redirect('/account/login');
  } catch (error) {
    return {error: 'Something went wrong. Please try again.'};
  }
}

export default function RegisterPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="pt-[44px] min-h-screen bg-[#FFF9F3]">
      <section className="py-16 md:py-24">
        <div className="max-w-[400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10 fade-in-up">
            <h1 className="font-['Playfair_Display'] text-[clamp(28px,5vw,36px)] text-[#1A1A1A] mb-3 font-light">
              Create Account
            </h1>
            <p className="text-[#666666] text-[15px]">
              Join Daily Loom for exclusive benefits
            </p>
          </div>

          <Form method="post" className="space-y-5 fade-in-up delay-200">
            {actionData?.error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-[14px] rounded">
                {actionData.error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none transition-colors"
                placeholder="Min. 8 characters"
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" name="newsletter" id="newsletter" className="w-4 h-4 mt-1 accent-[#6B8E72]" defaultChecked />
              <label htmlFor="newsletter" className="text-[13px] text-[#666666]">
                Send me updates about new products, care tips, and exclusive offers.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase hover:bg-[#2B2B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-[12px] text-[#999] text-center">
              By creating an account, you agree to our{' '}
              <Link to="/pages/terms" className="underline hover:text-[#666]">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/pages/privacy" className="underline hover:text-[#666]">Privacy Policy</Link>.
            </p>
          </Form>

          <div className="mt-8 text-center fade-in-up delay-200">
            <p className="text-[#666666] text-[14px]">
              Already have an account?{' '}
              <Link to="/account/login" className="text-[#6B8E72] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const REGISTER_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const LOGIN_MUTATION = `#graphql
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
