import React, { useEffect, useRef } from 'react';

const App = () => {
  const containerRefHelloWorld = useRef(null); // Ref for the HelloWorld component

  useEffect(() => {
    const loadAngularComponent = async () => {
      const module = await import('myAngularApp/HelloWorldMount');
      const mount = module.default;

      if (containerRefHelloWorld.current) {
        mount(containerRefHelloWorld.current); // Use correct ref here
      }
    };

    loadAngularComponent();
  }, []);

  return (
    <div>
      <h1>React App</h1>
      <div ref={containerRefHelloWorld}></div> {/* HelloWorld component will mount here */}
    </div>
  );
};

export default App;
