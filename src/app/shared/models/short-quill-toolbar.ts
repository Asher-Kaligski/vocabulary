const shortQuillToolbar = {
  'emoji-shortname': true,
  'emoji-textarea': true,
  'emoji-toolbar': true,
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons

    [{ list: 'ordered' }, { list: 'bullet' }],

    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],

    ['clean'], // remove formatting button

    ['emoji'],
  ],
};

export { shortQuillToolbar };
