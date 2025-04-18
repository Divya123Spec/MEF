import 'zone.js'; // Make sure Zone.js is loaded
import React, { useEffect, useRef } from 'react';
import Sample from './sample';


const App = () => {
  const containerRef = useRef(null);
  const containerRefHelloWorld = useRef(null); // Ref for the HelloWorld component

  useEffect(() => {
    const loadAngularComponent = async () => {
      const module = await import('myAngularApp/HelloWorldMount');
      const helloWorldModule = await import('myAngularApp/HelloWorldMount');
      const mount = module.default;
        const mountHello = helloWorldModule.default; // Import the mount function from the Angular app

      if (containerRef.current) {
        mount(containerRef.current);  // Pass the container where Angular will be mounted
      }
      if (containerRef.current) {
        mountHello(containerRefHelloWorld.current);  // Pass the container where Angular will be mounted
      }
    };

    loadAngularComponent();
  }, []);

  return (
    <div>
      <h1>React App</h1>
      <Sample />
      <div ref={containerRef}></div>
      <div ref={containerRefHelloWorld}></div>
       {/* Angular component will mount here */}
    </div>
  );
};

export default App;
