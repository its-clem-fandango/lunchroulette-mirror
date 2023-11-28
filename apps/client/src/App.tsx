import Header1 from "@/components/Header1";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="gap-5 flex flex-col justify-center items-center">
      <h1 className="py-5 my-5 mx-4 bg-pink-500 text-3xl font-semibold text-yellow-500">
        Hello World
      </h1>
      <p>Hello World</p>
      <Header1 className="p-20">This is a Header 1</Header1>
      <Button className="p-4">Click me</Button>
    </div>
  );
}

export default App;
