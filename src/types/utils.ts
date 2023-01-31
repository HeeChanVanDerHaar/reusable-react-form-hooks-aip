// TypeScript 3.7 introduced "assertion functions" that
// allow us to define an assertion function.
// We might use such function to ensure that anything we pass to it is a React.FC
// while writing no code whatsoever! BINGO!
export function assertFC<P>(component: React.FC<P>): asserts component is React.FC<P> {
	// We don't need to do anything here because the assertion happens
	// on the type level - we need to pass a valid React component
}
