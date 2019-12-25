import { useRef, useState, useEffect } from 'react';

interface IHoverProps {
	isHovered: boolean;
}

// Hook
export function useHoverUL() : [React.RefObject<HTMLUListElement>, IHoverProps] {
	const [hoverProps, setValue] = useState({ isHovered: false });
 
	const divRef = useRef<HTMLUListElement>(null);
 
	const handleMouseOver = () => setValue({ isHovered: true });
	const handleMouseOut = () => setValue({ isHovered: false });
 
	useEffect(
	  () => {
		 const node = divRef.current;
		 if (node) {
			node.addEventListener('mouseenter', () => handleMouseOver());
			node.addEventListener('mouseleave', () => handleMouseOut());
			console.log('usao')
 
			return () => {
				node.removeEventListener('mouseenter', () => handleMouseOver());
				node.removeEventListener('mouseleave', () => handleMouseOut());
				console.log('izasao')
			};
		 }
	  }, [divRef.current] // Recall only if ref changes
	);
 
	return [divRef, hoverProps];
}

