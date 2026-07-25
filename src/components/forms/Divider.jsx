/**
 * Divider — Horizontal divider with centered text label.
 * Used between form sections (e.g., "or continue with").
 */
const Divider = ({ text = 'or' }) => {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="flex-1 border-t border-border/50" />
      <span className="text-xs text-text-muted uppercase tracking-wider font-medium">
        {text}
      </span>
      <div className="flex-1 border-t border-border/50" />
    </div>
  );
};

export default Divider;
