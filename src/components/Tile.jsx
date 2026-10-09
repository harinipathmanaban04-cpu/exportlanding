/** Bento tile with a mouse-following spotlight (driven by --mx / --my). */
export default function Tile({ className = 'tile', children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <article className={className} onMouseMove={onMove} {...rest}>
      {children}
    </article>
  );
}
