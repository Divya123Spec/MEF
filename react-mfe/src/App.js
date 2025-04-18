import React, { useEffect, useRef } from 'react';

const App = () => {
  const containerRef = useRef(null); // Ref for Angular app
  const containerRefHelloWorld = useRef(null); // Ref for the HelloWorld component

  useEffect(() => {
    const loadAngularComponent = async () => {
      // Import the Angular mount function
      const module = await import('myAngularApp/HelloWorldMount');
      const mount = module.default;

      // Mount the Angular app (including HelloWorld component) only once
      if (containerRef.current) {
        mount(containerRef.current); // Pass the container where Angular will be mounted
      }
    };

    loadAngularComponent();
  }, []); // Empty dependency array ensures this effect is only run once

  return (
    <div>
      <h1>React App</h1>
      <div ref={containerRef}></div> {/* Angular app will mount here */}
      <div ref={containerRefHelloWorld}></div> {/* HelloWorld component will mount here */}
    </div>
  );
};

export default App;
