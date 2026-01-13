import type {ActionFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {Form, Link, useActionData, useNavigation} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{title: 'Reset Password | Daily Loom'}];
};

export async function action({request, context}: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;

  if (!email) {
    return {error: 'Please enter your email address.'};
  }

  try {
    await context.storefront.mutate(RECOVER_MUTATION, {
      variables: {email},
    });

    return {success: true};
  } catch (error) {
    return {error: 'Something went wrong. Please try again.'};
  }
}

export default function RecoverPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  if (actionData?.success) {
    return (
      <div className="pt-[44px] min-h-screen bg-[#FFF9F3]">
        <section className="py-16 md:py-24">
          <div className="max-w-[400px] mx-auto px-4 md:px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-[#6B8E72] rounded-full flex items-center justify-center fade-in-up">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="font-['Playfair_Display'] text-[28px] text-[#1A1A1A] mb-4 font-light fade-in-up delay-200">
              Check Your Email
            </h1>
            <p className="text-[#666666] text-[15px] mb-8 fade-in-up delay-200">
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </p>
            <Link
              to="/account/login"
              className="inline-block px-8 py-3 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase hover:bg-[#2B2B2B] transition-colors fade-in-up delay-200"
            >
              Back to Login
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-[44px] min-h-screen bg-[#FFF9F3]">
      <section className="py-16 md:py-24">
        <div className="max-w-[400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10 fade-in-up">
            <h1 className="font-['Playfair_Display'] text-[clamp(28px,5vw,36px)] text-[#1A1A1A] mb-3 font-light">
              Reset Password
            </h1>
            <p className="text-[#666666] text-[15px]">
              Enter your email and we'll send you a reset link
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase hover:bg-[#2B2B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </Form>

          <div className="mt-8 text-center fade-in-up delay-200">
            <Link to="/account/login" className="text-[14px] text-[#6B8E72] hover:underline">
              ← Back to Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const RECOVER_MUTATION = `#graphql
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
