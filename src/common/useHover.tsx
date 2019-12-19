import { useRef, useState, useEffect } from 'react';

interface IHoverProps {
	id: number;
	isHovered: boolean;
}

// Hook
export function useHover() : [React.RefObject<HTMLDivElement>, IHoverProps] {
	const [hoverProps, setValue] = useState({ id: 0, isHovered: false});
 
	const divRef = useRef<HTMLDivElement>(null);
 
	const handleMouseOver = (id: string) => setValue({ id: parseInt(id), isHovered: true});
	const handleMouseOut = (id: string) => setValue({ id: parseInt(id), isHovered: false});
 
	useEffect(
	  () => {
		 const node = divRef.current;
		 if (node) {
			node.addEventListener('mouseenter', () => handleMouseOver(node.id));
			node.addEventListener('mouseleave', () => handleMouseOut(node.id));
 
			return () => {
			  node.removeEventListener('mouseenter', () => handleMouseOver(node.id));
			  node.removeEventListener('mouseleave', () => handleMouseOut(node.id));
			};
		 }
	  }, [divRef.current] // Recall only if ref changes
	);
 
	return [divRef, hoverProps];
}

