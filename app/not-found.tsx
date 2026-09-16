import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found container">
      <Eyebrow>404 / Page not found</Eyebrow>
      <h1>A different direction.</h1>
      <p>
        The page you’re looking for isn’t here. Explore the product collection
        or start a conversation.
      </p>
      <div className="hero-buttons">
        <Button href="/products/">Explore products</Button>
        <Button href="/contact/" secondary>
          Request a quote
        </Button>
      </div>
    </section>
  );
}
