import { useEffect, useRef, useState } from "react";

const Body = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([
    "Nick Giannopoulos",
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
  ]);
  const [selectedChips, setSelectedChips] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleItemClick = (item) => {
    setItems((prevItems) => prevItems.filter((i) => i !== item));
    setSelectedChips((prevChips) => [...prevChips, item]);
    setInputValue("");
  };

  const handleChipRemove = (chip) => {
    setItems((prevItems) => [...prevItems, chip]);
    setSelectedChips((prevChips) => prevChips.filter((c) => c !== chip));
  };

  const handleInputKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedChips.length > 0
    ) {
      // Highlight the last chip
      setSelectedChips((prevChips) => {
        const lastChip = prevChips[prevChips.length - 1];
        const newChips = prevChips.slice(0, -1);
        // Add your logic for highlighting here (you can use a class or inline styles)
        console.log("Highlight:", lastChip);
        return newChips;
      });
    }
  };

  const handleChipClick = (chip) => {
    setSelectedChips((prevChips) => prevChips.filter((c) => c !== chip));
    setItems((prevItems) => [...prevItems, chip]);
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mt-8">
      <input
        ref={inputRef}
        type="text"
        className="p-2 border border-gray-300 rounded"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type to search..."
      />
      <div className="mt-2 flex flex-wrap">
        {selectedChips.map((chip) => (
          <div
            key={chip}
            className="bg-blue-500 text-white rounded p-2 m-1 cursor-pointer"
          >
            {chip} <span onClick={() => handleChipClick(chip)}>X</span>
          </div>
        ))}
      </div>
      <ul className="mt-2">
        {items
          .filter((item) =>
            item.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((item) => (
            <li
              key={item}
              className="cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Body;
