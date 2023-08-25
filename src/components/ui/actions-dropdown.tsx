// import { FaEdit, FaEllipsisH, FaTrash } from 'react-icons/fa';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaEllipsisH } from '@react-icons/all-files/fa/FaEllipsisH';

interface ActionsDropdownProps {
  onDelete: () => void;
  onUpdate: () => void;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  onDelete,
  onUpdate,
}) => {
  return (
    <div>
      <div className="dropdown">
        <label className="h-full cursor-pointer" tabIndex={0}>
          <FaEllipsisH className="text-lg ml-2" />
        </label>
        <div className="dropdown-menu dropdown-menu-left z-[10] w-40">
          <div
            tabIndex={1}
            className="dropdown-item flex-row gap-2 text-sm"
            onClick={onUpdate}
          >
            <FaEdit />
            <p>Update</p>
          </div>
          <div
            tabIndex={2}
            className="dropdown-item flex-row gap-2 text-sm"
            onClick={onDelete}
          >
            <FaTrash />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionsDropdown;
