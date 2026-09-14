import {redirect, type LoaderFunctionArgs, type MetaFunction, type ActionFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {ProductBuy} from '~/components/product/ProductBuy';
import {getProductStoryContent} from '~/data/productStoryContent';
import productStoryStyles from '~/styles/product-story.css?url';

export function links() {
  return [{rel: 'stylesheet', href: productStoryStyles}];
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const product = data?.product;
  return [
    {title: `Buy ${product?.title || 'Product'} | Daily Loom`},
    {name: 'description', content: product?.description?.slice(0, 160) || 'Premium handloom textile'},
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Response('Product not found', {status: 404});
  }

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle},
  });

  if (!product) {
    throw new Response('Product not found', {status: 404});
  }

  return {product};
}

export async function action({request, context}: ActionFunctionArgs) {
  const formData = await request.formData();
  const variantId = formData.get('variantId') as string;
  const quantity = parseInt(formData.get('quantity') as string, 10) || 1;

  if (!variantId) {
    throw new Response('Missing variant', {status: 400});
  }

  const {cart} = context;
  await cart.addLines([{merchandiseId: variantId, quantity}]);

  // A real add-to-bag: land the visitor on the real Shopify cart, not a
  // mock drawer — matches the "select, add, see it in the bag" flow the
  // design specified, using the cart that's already fully wired to
  // checkout instead of reimplementing one with fake state.
  return redirect('/cart');
}

export default function ProductBuyPage() {
  const {product} = useLoaderData<typeof loader>();
  const content = getProductStoryContent(product.productType, product.title);

  return <ProductBuy product={product} content={content} />;
}

const PRODUCT_QUERY = `#graphql
  query ProductBuy($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      options {
        name
        optionValues {
          name
        }
      }
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
      availableForSale
    }
  }
`;
