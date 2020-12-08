import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    minWidth: '600px',
    transform: 'translate(-50%, -50%)',
    background: '#E4E4E7',
    fontFamily: 'Poppins',
    overflow: 'visible',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
};
export default function ContactListView({ contactGroup }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  Modal.setAppElement('#root');

  function openModal(contact) {
    setModalIsOpen(true);
    setActiveContact(contact);
  }

  function closeModal() {
    setModalIsOpen(false);
    setActiveContact(null);
  }

  return (
    <>
      {contactGroup && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 px-4 py-8">
          {contactGroup.map((contact, index) => (
            <div
              key={index}
              className="border-b border-dotted border-gray-400 px-3 py-3 cursor-pointer"
              onClick={() => openModal(contact)}
            >
              {contact.name.first}, <span className="uppercase">{contact.name.last}</span>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Contact Info"
      >
        {activeContact && (
          <div className="relative flex flex-col sm:flex-row items-center py-6">
            <button className="absolute -top-3 -left-3" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
            <figure className="px-4">
              <img
                src={activeContact.picture.medium}
                className="rounded-full shadow-md w-32 h-32"
                alt={activeContact.name.first + ' ' + activeContact.name.last}
              />
            </figure>
            <div>
              <h2 className="text-4xl mb-8 mt-8 sm:mt-0 text-gray-500 font-bold">
                <span className="uppercase">{activeContact.name.last},</span>{' '}
                <span className="lowercase">{activeContact.name.first}</span>
              </h2>
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="font-bold">e-mail</td>
                    <td className="text-sm px-1 py-1">{activeContact.email}</td>
                  </tr>
                  <tr className="bg-emerald-200">
                    <td className="font-bold">phone</td>
                    <td className="text-sm px-1 py-1">{activeContact.phone}</td>
                  </tr>
                  <tr className="bg-emerald-200">
                    <td className="font-bold">street</td>
                    <td className="text-sm px-1 py-1">
                      {activeContact.location.street.number} {activeContact.location.street.name}
                    </td>
                  </tr>
                  <tr className="bg-emerald-200">
                    <td className="font-bold">city</td>
                    <td className="text-sm px-1 py-1">{activeContact.location.city}</td>
                  </tr>
                  <tr className="bg-emerald-200">
                    <td className="font-bold">state</td>
                    <td className="text-sm px-1 py-1">{activeContact.location.state}</td>
                  </tr>
                  <tr className="bg-emerald-200">
                    <td className="font-bold">postcode</td>
                    <td className="text-sm px-1 py-1">{activeContact.location.postcode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="banner absolute text-white font-3xl">
              <span className="uppercase">USERNAME</span>
              <span className="lowercase ml-2">{activeContact.login.username}</span>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
