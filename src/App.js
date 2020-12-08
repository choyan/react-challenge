import { useEffect, useState } from 'react';
import { LoadingIndicator } from 'shared';
import ContactListView from './ContactListView';

function App() {
  const [activeTab, setActiveTab] = useState('A');
  const [contactList, setContactList] = useState([]);
  const [contactGroup, setContactGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function changeTabFromSelect(e) {
    setActiveTab(e.target.value);
  }

  useEffect(() => {
    setContactGroup(contactList[activeTab]);
  }, [activeTab, contactList]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await fetch(
          'https://randomuser.me/api/?seed=seed&results=120&nat=US&inc=id,email,name,location,phone,picture,login',
        )
          .then((res) => res.json())
          .then((data) => {
            // Structure the contactGroup object and assign empty array to each key.
            let contactGroup = {};
            for (let i = 0; i < 26; i++)
              contactGroup[String.fromCharCode(97 + i).toUpperCase()] = [];

            // Sorting the whole data by the lastname.
            // So that we dont have to sort separately for every letter.
            const sortedList = data.results.sort((a, b) => {
              return (
                a.name.last.localeCompare(b.name.last) ||
                a.name.first.localeCompare(b.name.first) ||
                0
              );
            });

            // Now we can push the contact object to the corresponding letter orray.
            sortedList.map((item) => contactGroup[item.name.last[0]].push(item));
            setContactList(contactGroup);
          });
      } catch (err) {
        console.log('There was an error loading from the server');
      }
      setIsLoading(false);
    }, [500]);
  }, []);

  return (
    <div className="w-full lg:w-11/12 mx-auto bg-gray-200 px-3 py-3 rounded-lg border border-gray-300 font-poppins">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a letter
            </label>

            <select
              id="tabs"
              name="tabs"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              onChange={changeTabFromSelect}
            >
              {Object.keys(contactList).map(function (keyName, keyIndex) {
                return <option>{keyName}</option>;
              })}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap" aria-label="Tabs">
                {Object.keys(contactList).map(function (keyName, keyIndex) {
                  return (
                    <button
                      key={keyIndex}
                      className={`${
                        keyName === activeTab
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500'
                      } relative flex-1 text-center hover:text-gray-800 focus:outline-none hover:border-gray-300 whitespace-nowrap py-3 px-3 mx-2 border-b-2 font-medium text-md cursor-pointer ${
                        contactList[keyName].length === 0 && 'disabled:opacity-50'
                      }`}
                      onClick={() => setActiveTab(keyName)}
                      disabled={contactList[keyName].length === 0}
                    >
                      <span className="lowercase">{keyName}</span>
                      <span className="absolute text-xs top-6 ml-3">
                        {contactList[keyName].length}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <ContactListView contactGroup={contactGroup} />
        </>
      )}
    </div>
  );
}

export default App;
