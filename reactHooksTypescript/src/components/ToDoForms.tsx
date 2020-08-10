import React, { useState, useRef } from "react";

interface ToDoFormProps {
  onAdd(title: string): void;
}

const ToDoForms: React.FC<ToDoFormProps> = props => {
  //const [title, setTitle] = useState<string>("");
  // React.ChangeEvent<HTMLInputElement> is a Generic Type

  //   const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setTitle(event.target.value);
  //   };

  const ref = useRef<HTMLInputElement>(null);

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      props.onAdd(ref.current!.value);
      ref.current!.value = "";
      // we put ! when we are sure that here everything will be OK, so we can remove error
      //setTitle("");
    }
  };
  return (
    <div className="input-field mt1">
      <label htmlFor="title" className="active">
        Your task to be done!
      </label>
      <input
        ref={ref}
        //value={title}
        //onChange={changeHandler}
        id="title"
        type="text"
        placeholder="Your task to be done!"
        onKeyPress={keyPressHandler}
      />
    </div>
  );
};

export default ToDoForms;
