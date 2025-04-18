import 'zone.js'; // Ensure Zone.js is loaded
import React, { useEffect, useRef } from 'react';
import Sample from './sample';

const App = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadAngularComponent = async () => {
      // Import the necessary mount function for HelloWorldComponent
      const helloWorldModule = await import('myAngularApp/HelloWorldMount');
      const mountHello = helloWorldModule.default; // Import the mount function

      // Call mountHello to add the custom element to the container
      if (containerRef.current) {
        mountHello(containerRef.current);  // Only call this to add the custom element
      }
    };

    loadAngularComponent();
  }, []);

  return (
    <div>
      <h1>React App</h1>
      <Sample />
      <div ref={containerRef}></div> {/* HelloWorld component will be mounted here */}
    </div>
  );
};

export default App;
