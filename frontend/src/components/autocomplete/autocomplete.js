import React, { useState, useRef, useEffect } from "react";

function Autocomplete({ suggestions, searchHandler }) {
  // hook for storing filtered suggestions
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // hook for storing index for active suggestion
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  // boolean hook for storing whether to show suggestion or not
  const [showSuggestions, setShowSuggestions] = useState(false);
  //  hook for storing input value
  const [input, setInput] = useState("");

  // filtering the suggestions according to user
  const onChange = (e) => {
    const userInput = e.target.value;

    const inputWords = userInput.trim().toLowerCase().split(" ");
    let filtered = suggestions;
    inputWords.forEach((word) => {
      filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(word)
      );
    });
    // Filter our suggestions that don't contain the user's input
    // const unLinked = suggestions.filter(
    //   (suggestion) =>
    //     suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // );

    setInput(e.target.value);
    setFilteredSuggestions(filtered.slice(0, 3));
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  // on click handler when user click the suggestion from suggestion box
  function onClick(e) {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    // setInput(filteredSuggestions[activeSuggestionIndex]);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  }

  // function to active suggestion on up/down arrow keys and setting value on enter/tab key
  function onKeyDown(e) {
    setShowSuggestions(true);
    // down key
    if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        setActiveSuggestionIndex(filteredSuggestions.length - 1);
      } else {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    }
    // up key
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex === filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(0);
      } else {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    }
    // tab or enter key
    else if (e.keyCode === 13 || e.keyCode === 9) {
      setInput(filteredSuggestions[activeSuggestionIndex]);
      setShowSuggestions(false);
    }
  }

  // ref for outside click
  const wrapperRef = useRef(null);
  // binding click handler to div
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  // checking if click is outside div
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  // function for showing suggestion list
  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li
              className={className}
              key={suggestion}
              onMouseEnter={() => setActiveSuggestionIndex(index)}
              // onMouseLeave={()=>setHovered(false)}
              onClick={(e) => onClick(e)}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em>No suggestions</em>
      </div>
    );
  };
  return (
    <div ref={wrapperRef}>
      <form onSubmit={(e) => searchHandler(e, input)}>
        <div class="input-group">
          <input
            type="text"
            className="form-control "
            placeholder="Enter title to search..."
            // aria-label="Recipient's username"
            aria-describedby="button-search"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={input}
            required
          />
          <button type="submit" class="input-group-text btn btn-primary">
            Search
          </button>
        </div>
      </form>
      {showSuggestions && input && <SuggestionsListComponent />}
    </div>
  );
}

export default Autocomplete;
