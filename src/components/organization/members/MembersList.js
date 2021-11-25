import React from "react";

/*
  ExampleMember = {
    name : ...,
    image : ...,
    description : ...,
    facebookUrl : ...,
    linkedinUrl : ...,
  }
*/

// prop must be an array of members
const MembersList = ({ membersList }) => {
  // Renders all the members of the list
  return (
    // Checking if list exists and its length 
    membersList && membersList.length
      ? (
        membersList.map((member) => (
          <div key={`memberlist-${member.name}`}>

            <b>{member.name}</b>
            <p>{member.description}</p>

            <img src={member.image} alt={member.name} />
            <a href={member.facebookUrl}>Facebook</a>
            <a href={member.linkedinUrl}>LinkedIn</a>

          </div>
        ))
      )
      : (
        // Fallback
        <b> No se han proporcionado miembros </b>
      )
  )
};

export default MembersList;
