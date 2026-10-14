/**
 * Same visual as <img>, prefers WebP when a sibling .webp exists in /public.
 * Does not change layout — pass the same className/style as before.
 */
export default function OptImg({
  src,
  alt = "",
  className = "",
  width,
  height,
  loading,
  fetchPriority,
  decoding = "async",
  ...rest
}) {
  const webpSrc =
    typeof src === "string" && /\.(png|jpe?g)$/i.test(src)
      ? src.replace(/\.(png|jpe?g)$/i, ".webp")
      : null;

  const img = (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      {...rest}
    />
  );

  if (!webpSrc) return img;

  // display:contents keeps layout identical to a bare <img>
  return (
    <picture style={{ display: "contents" }}>
      <source srcSet={webpSrc} type="image/webp" />
      {img}
    </picture>
  );
}
