import type {ActionFunctionArgs, LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {Form, Link, useActionData, useNavigation} from '@remix-run/react';
import {redirect} from '@shopify/remix-oxygen';

export const meta: MetaFunction = () => {
  return [{title: 'Login | Daily Loom'}];
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
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {error: 'Please enter both email and password.'};
  }

  try {
    const {customerAccessTokenCreate} = await context.storefront.mutate(LOGIN_MUTATION, {
      variables: {input: {email, password}},
    });

    if (customerAccessTokenCreate?.customerUserErrors?.length) {
      const error = customerAccessTokenCreate.customerUserErrors[0];
      return {error: error.message || 'Invalid email or password.'};
    }

    const accessToken = customerAccessTokenCreate?.customerAccessToken?.accessToken;
    if (!accessToken) {
      return {error: 'Invalid email or password.'};
    }

    context.session.set('customerAccessToken', accessToken);

    return redirect('/account', {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    });
  } catch (error) {
    return {error: 'Something went wrong. Please try again.'};
  }
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="pt-[44px] min-h-screen bg-[#FFF9F3]">
      <section className="py-16 md:py-24">
        <div className="max-w-[400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10 fade-in-up">
            <h1 className="font-['Playfair_Display'] text-[clamp(28px,5vw,36px)] text-[#1A1A1A] mb-3 font-light">
              Welcome Back
            </h1>
            <p className="text-[#666666] text-[15px]">
              Sign in to your Daily Loom account
            </p>
          </div>

          <Form method="post" className="space-y-6 fade-in-up delay-200">
            {actionData?.error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-[14px] rounded">
                {actionData.error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                Email
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
              <label htmlFor="password" className="block text-[13px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-[#ccc] bg-white text-[15px] focus:border-[#6B8E72] focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="remember" className="w-4 h-4 accent-[#6B8E72]" />
                <span className="text-[#666666]">Remember me</span>
              </label>
              <Link to="/account/recover" className="text-[#6B8E72] hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase hover:bg-[#2B2B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </Form>

          <div className="mt-8 text-center fade-in-up delay-200">
            <p className="text-[#666666] text-[14px]">
              Don't have an account?{' '}
              <Link to="/account/register" className="text-[#6B8E72] font-medium hover:underline">
                Create one
              </Link>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[rgba(0,0,0,0.08)] fade-in-up delay-200">
            <p className="text-center text-[13px] text-[#999] mb-4">Or continue as guest</p>
            <Link
              to="/store"
              className="block w-full py-3 border border-[#ccc] text-[#1A1A1A] text-[13px] font-medium tracking-wide text-center hover:border-[#1A1A1A] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

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
