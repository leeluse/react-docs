import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ content }: { content: string }) {
    return (
        <div className="my-2 text-sm overflow-x-auto rounded-md">
            <SyntaxHighlighter
                language="tsx"
                style={oneDark}
                customStyle={{ margin: 0, padding: '12px', borderRadius: '6px' }}
            >
                {content.trim()}
            </SyntaxHighlighter>
        </div>
    );
}