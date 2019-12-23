

// import * as React from 'react';

type RenderPropType<InputType, OtherInputType> = { c: number } & InputType & OtherInputType;

type RowComponentPropTypes<InputType, OtherInputType> = {
  input: InputType;
  otherInput: OtherInputType;
  render: (props: RenderPropType<InputType, OtherInputType>) => JSX.Element;
};


export function RowComponent<
	InputType extends { a: number },
	OtherInputType extends { b: number }
> (props: RowComponentPropTypes<InputType, OtherInputType>) {

  	const convert = (input: InputType, output: OtherInputType) => {
   	return { c: input.a + output.b, ...input, ...output };
	};
	  
   return props.render(
   	convert(props.input, props.otherInput)
   );
}

