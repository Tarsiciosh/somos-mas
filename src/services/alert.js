import Swal from 'sweetalert2'

export const alert = async (title, text, icon, confirmButtonText) => {
    await Swal.fire({
            title,
            text,
            icon,
            confirmButtonText
        })
}
