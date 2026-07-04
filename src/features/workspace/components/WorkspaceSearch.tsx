import { Input } from '@/shared/components/ui/Input';
import { cn } from '@/shared/lib/cn';

interface WorkspaceSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  className?: string;
}

export function WorkspaceSearch({
  value,
  onChange,
  resultCount,
  className,
}: WorkspaceSearchProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor="workspace-search" className="sr-only">
        Search workspaces
      </label>
      <Input
        id="workspace-search"
        type="search"
        placeholder="Search workspaces…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby="workspace-search-hint"
      />
      <p id="workspace-search-hint" className="text-text-muted text-xs">
        {typeof resultCount === 'number'
          ? `${resultCount} workspace${resultCount === 1 ? '' : 's'} found`
          : 'Search by name or description'}
      </p>
    </div>
  );
}
