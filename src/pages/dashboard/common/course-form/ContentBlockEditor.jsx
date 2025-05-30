// src/components/course-form/ContentBlockEditor.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  X,
  Plus,
  Youtube,
  ClipboardList,
  Heading,
  AlignLeft,
  Code,
  Download,
  Link,
  Info,
  CheckCircle,
  XCircle,
  Briefcase,
  BookOpenText,
  Image as ImageIcon,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import { commonInputClasses } from '../../../../constants/styles';

const ContentBlockEditor = React.memo(({ block, lessonTempId, index, provided, snapshot, handleContentBlockChange, handleContentBlockItemsChange, handleAddListItem, handleRemoveListItem, handleRemoveContentBlock }) => {
    // Local state for each input's value
    const [localTextInput, setLocalTextInput] = useState('');
    const [localLevelInput, setLocalLevelInput] = useState(3);
    const [localLanguageInput, setLocalLanguageInput] = useState('');
    const [localCodeInput, setLocalCodeInput] = useState('');
    const [localLabelInput, setLocalLabelInput] = useState('');
    const [localFileUrlInput, setLocalFileUrlInput] = useState('');
    const [localButtonTextInput, setLocalButtonTextInput] = useState('');
    const [localButtonLinkInput, setLocalButtonLinkInput] = useState('');
    const [localListItems, setLocalListItems] = useState(['']);

    // Effect to synchronize local state with block prop whenever block changes
    useEffect(() => {
      if (block.type === 'paragraph' || block.type === 'heading' || block.type === 'call-to-action') {
        setLocalTextInput(block.text || '');
      }
      if (block.type === 'heading') {
        setLocalLevelInput(block.level || 3);
      }
      if (block.type === 'code') {
        setLocalLanguageInput(block.language || '');
        setLocalCodeInput(block.code || '');
      }
      if (block.type === 'download') {
        setLocalLabelInput(block.label || '');
        setLocalFileUrlInput(block.fileUrl || '');
      }
      if (block.type === 'call-to-action') {
        setLocalButtonTextInput(block.buttonText || '');
        setLocalButtonLinkInput(block.buttonLink || '');
      }
      if (block.type === 'list' || block.type === 'ordered-list') {
        setLocalListItems(block.items || ['']); // Ensure at least one empty item for UI
      }
    }, [block]); // Re-run this effect when the 'block' object reference changes


    // --- Local Change Handlers for each input type ---
    const handleLocalChange = (e, fieldName) => {
        const newValue = e.target.value;
        // Update local state immediately
        if (fieldName === 'text' && (block.type === 'paragraph' || block.type === 'heading' || block.type === 'call-to-action')) {
            setLocalTextInput(newValue);
        } else if (fieldName === 'level' && block.type === 'heading') {
            setLocalLevelInput(parseInt(newValue, 10));
        } else if (fieldName === 'language' && block.type === 'code') {
            setLocalLanguageInput(newValue);
        } else if (fieldName === 'code' && block.type === 'code') {
            setLocalCodeInput(newValue);
        } else if (fieldName === 'label' && block.type === 'download') {
            setLocalLabelInput(newValue);
        } else if (fieldName === 'fileUrl' && block.type === 'download') {
            setLocalFileUrlInput(newValue);
        } else if (fieldName === 'buttonText' && block.type === 'call-to-action') {
            setLocalButtonTextInput(newValue);
        } else if (fieldName === 'buttonLink' && block.type === 'call-to-action') {
            setLocalButtonLinkInput(newValue);
        }

        // Propagate change to parent's global state
        handleContentBlockChange(lessonTempId, block.tempId, fieldName, newValue);
    };

    const handleLocalListItemChange = (e, itemIndex) => {
        const newValue = e.target.value;
        const newList = [...localListItems];
        newList[itemIndex] = newValue;
        setLocalListItems(newList);

        // Propagate change to parent's global state
        handleContentBlockItemsChange(lessonTempId, block.tempId, itemIndex, newValue);
    };

    const handleLocalAddListItem = () => {
      const newList = [...localListItems, ''];
      setLocalListItems(newList);
      handleAddListItem(lessonTempId, block.tempId);
    };

    const handleLocalRemoveListItem = (itemIndex) => {
        if (localListItems.length <= 1) return; // Prevent removing the last item
        const newList = localListItems.filter((_, idx) => idx !== itemIndex);
        setLocalListItems(newList);
        handleRemoveListItem(lessonTempId, block.tempId, itemIndex);
    };
    // --- End Local Change Handlers ---


    const blockTypeIcon = (type) => {
      switch (type) {
        case 'paragraph': return <AlignLeft size={16} className="text-blue-400" />;
        case 'heading': return <Heading size={16} className="text-green-400" />;
        case 'list':
        case 'ordered-list': return <ClipboardList size={16} className="text-yellow-400" />;
        case 'code': return <Code size={16} className="text-purple-400" />;
        case 'download': return <Download size={16} className="text-red-400" />;
        case 'call-to-action': return <Link size={16} className="text-pink-400" />;
        case 'image': return <ImageIcon size={16} className="text-teal-400" />;
        default: return <Info size={16} className="text-gray-400" />;
      }
    };

    // Simplify the style merging, mirroring the working Announcement example.
    // Let provided.draggableProps.style primarily handle positioning and dimensions.
    const combinedStyle = {
      ...provided.draggableProps.style,
      // Your custom styles for the dragging state
      background: snapshot.isDragging ? '#3A3A3A' : '#2A2A2A',
      border: snapshot.isDragging ? '1px solid #9333ea' : '1px solid #3d3d3d',
      zIndex: snapshot.isDragging ? 9999 : 'auto',
      // Explicitly set transition to 'none' when dragging to prevent conflicts
      // with dnd's own immediate positioning updates.
      transition: snapshot.isDragging ? 'none' : 'background 0.2s ease, border 0.2s ease',
    };

    return (
      <motion.div
        ref={provided.innerRef} // Required for Draggable
        {...provided.draggableProps} // Spread all draggable props (like data-rbd-draggable-id)
        {...provided.dragHandleProps} // Apply drag handle props here (making entire block draggable)
        className="p-4 rounded-lg border border-gray-800 bg-[#2A2A2A] relative group mb-3 shadow-inner shadow-black/30"
        style={combinedStyle} // Apply the carefully combined style
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="flex items-center justify-between mb-3 border-b border-gray-700 pb-2">
            <span className="text-gray-400 text-sm font-semibold flex items-center gap-2">
                {blockTypeIcon(block.type)}
                {block.type.replace('-', ' ').toUpperCase()} BLOCK
            </span>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                    className="p-1 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 cursor-grab active:cursor-grabbing transition-colors"
                    title="Drag to reorder"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical"><path d="M9 6h.01"/><path d="M9 12h.01"/><path d="M9 18h.01"/><path d="M15 6h.01"/><path d="M15 12h.01"/><path d="M15 18h.01"/></svg>
                </div>
                {/* Delete button */}
                <button
                    type="button"
                    onClick={() => handleRemoveContentBlock(lessonTempId, block.tempId)}
                    className="p-1 rounded-full bg-red-700 text-white hover:bg-red-600 transition-colors"
                    title="Delete Block"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>

        {/* Ensure all input elements consistently use 'w-full' for fluid width */}
        {block.type === 'paragraph' && (
          <textarea
            name="text"
            placeholder="Enter paragraph text..."
            value={localTextInput}
            onChange={(e) => handleLocalChange(e, 'text')}
            rows="3"
            className={`${commonInputClasses} w-full`} // ADD w-full
          />
        )}
        {block.type === 'heading' && (
          <>
            <input
              type="text"
              name="text"
              placeholder="Enter heading text..."
              value={localTextInput}
              onChange={(e) => handleLocalChange(e, 'text')}
              className={`${commonInputClasses} mb-2 w-full`} // ADD w-full
            />
            <select
              name="level"
              value={localLevelInput}
              onChange={(e) => handleLocalChange(e, 'level')}
              className={`${commonInputClasses} appearance-none w-full`} // ADD w-full
            >
              <option value={1}>H1 (Largest)</option>
              <option value={2}>H2</option>
              <option value={3}>H3 (Default)</option>
              <option value={4}>H4</option>
              <option value={5}>H5</option>
              <option value={6}>H6 (Smallest)</option>
            </select>
          </>
        )}
        {(block.type === 'list' || block.type === 'ordered-list') && (
          <div>
            {(localListItems || []).map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-2 mb-2">
                <span className="text-gray-400">
                  {block.type === 'ordered-list' ? `${itemIndex + 1}.` : '•'}
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleLocalListItemChange(e, itemIndex)}
                  placeholder={`List item ${itemIndex + 1}`}
                  className={`${commonInputClasses} w-full`} // ADD w-full
                />
                {(localListItems || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleLocalRemoveListItem(itemIndex)}
                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                    title="Remove List Item"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleLocalAddListItem}
              className="mt-2 text-purple-400 hover:text-purple-600 flex items-center gap-1 text-sm font-medium"
            >
              <Plus size={16} /> Add List Item
            </button>
          </div>
        )}
        {block.type === 'code' && (
          <>
            <input
              type="text"
              name="language"
              placeholder="Programming Language (e.g., javascript, python, css)"
              value={localLanguageInput}
              onChange={(e) => handleLocalChange(e, 'language')}
              className={`${commonInputClasses} mb-2 w-full`} // ADD w-full
            />
            <textarea
              name="code"
              placeholder="Paste your code snippet here..."
              value={localCodeInput}
              onChange={(e) => handleLocalChange(e, 'code')}
              rows="6"
              className={`${commonInputClasses} font-mono text-sm resize-y w-full`} // ADD w-full
            />
          </>
        )}
        {block.type === 'download' && (
          <>
            <input
              type="text"
              name="label"
              placeholder="Label for the download button (e.g., 'Download PDF Guide')"
              value={localLabelInput}
              onChange={(e) => handleLocalChange(e, 'label')}
              className={`${commonInputClasses} mb-2 w-full`} // ADD w-full
            />
            <input
              type="url"
              name="fileUrl"
              placeholder="Full URL to the downloadable file (e.g., https://example.com/file.zip)"
              value={localFileUrlInput}
              onChange={(e) => handleLocalChange(e, 'fileUrl')}
              className={`${commonInputClasses} w-full`} // ADD w-full
            />
          </>
        )}
        {block.type === 'call-to-action' && (
          <>
            <input
              type="text"
              name="text"
              placeholder="Main text for the call to action (e.g., 'Ready to dive deeper?')"
              value={localTextInput}
              onChange={(e) => handleLocalChange(e, 'text')}
              className={`${commonInputClasses} mb-2 w-full`} // ADD w-full
            />
            <input
              type="text"
              name="buttonText"
              placeholder="Button text (e.g., 'Enroll Now', 'Visit Website')"
              value={localButtonTextInput}
              onChange={(e) => handleLocalChange(e, 'buttonText')}
              className={`${commonInputClasses} mb-2 w-full`} // ADD w-full
            />
            <input
              type="url"
              name="buttonLink"
              placeholder="URL for the button link"
              value={localButtonLinkInput}
              onChange={(e) => handleLocalChange(e, 'buttonLink')}
              className={`${commonInputClasses} w-full`} // ADD w-full
            />
          </>
        )}
        {block.type === 'image' && (
             <input
                type="url"
                name="imageUrl"
                placeholder="Image URL (e.g., https://example.com/image.png)"
                value={block.imageUrl || ''}
                onChange={(e) => handleContentBlockChange(lessonTempId, block.tempId, 'imageUrl', e.target.value)}
                className={`${commonInputClasses} w-full`} // ADD w-full
            />
        )}
      </motion.div>
    );
});

export default ContentBlockEditor;