interface TextWithParagraphsProps {
  text: string;
}

export const TextWithParagraphs = ({ text }: TextWithParagraphsProps) => {
  const paragraphs = text.split("\n");

  return paragraphs.map((paragraph, index) => (
    <span key={index} className="terminal__paragraph">
      {paragraph}
      {index < paragraphs.length - 1 && <br />}
    </span>
  ));
};
