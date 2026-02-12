import Image from "next/image";
import Link from "next/link";

type PostCoverImageProps = {
  linkProps: React.ComponentProps<typeof Link>;
  imageProps: React.ComponentProps<typeof Image>;
};

export function PostCoverImage({ linkProps, imageProps }: PostCoverImageProps) {
  return (
    <Link
      {...linkProps}
      className="w-full h-full overflow-hidden rounded-xl"
    >
      <Image
        {...imageProps}
        alt={imageProps.alt}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition"
      />
    </Link>
  );
}
