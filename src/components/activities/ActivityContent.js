import React from "react";
import sanitizer from '../../helpers/sanitizer'

const ActivityContent = ({ HTMLContent }) => {
  // Sanitizing HTML
  const sanitizedHTML = sanitizer(HTMLContent)

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></div>
}

export default ActivityContent