import modalStyles from "@/styles/modal.module.scss"
import utilsStyles from "@/styles/utils.module.scss"
import {GTFont} from "@/app/font";

export default function ToDoModal({ title, onClose, children }){
  return (
    <div className={`${modalStyles.modal_layout} ${GTFont.className}`} onClick={onClose}>
      <div className={modalStyles.main_modal_div} onClick={e => e.stopPropagation()}>
        <div className={utilsStyles.flex_space}>
          <h2>{title}</h2>
          <i className="fa-solid fa-xmark" onClick={onClose} />
        </div>
        
        <div className={modalStyles.children}>
          {children}
        </div>
      </div>
    </div>
  )
}