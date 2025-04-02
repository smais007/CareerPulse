interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <a href={href}>{buttonText}</a>
    </div>
  );
}
