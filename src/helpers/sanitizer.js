// DOMPurify sanitizes HTML and prevents XSS attacks.
import DOMPurify from 'dompurify'
const sanitizer = DOMPurify.sanitize

export default sanitizer