export function load({ params }) {
  const slug = params.slug;

  return {
    props: {
      slug
    }
  }
}