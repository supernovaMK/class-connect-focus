
import React, { useState } from 'react';
import { FileText, Download, Upload } from 'lucide-react';

const FileShare = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: '미디어심리학_1주차.pptx',
      size: '2.4 MB',
      uploadDate: '2024-07-02',
      type: 'pptx'
    },
    {
      id: 2,
      name: '참고자료_인지편향.pdf',
      size: '1.8 MB',
      uploadDate: '2024-07-02',
      type: 'pdf'
    }
  ]);

  const handleDownload = (file) => {
    console.log('다운로드:', file.name);
    // 실제 다운로드 로직은 여기에 구현
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFile = {
        id: files.length + 1,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        type: file.name.split('.').pop()
      };
      setFiles([...files, newFile]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">자료 공유</h2>
        </div>
        
        <label className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm">
          <Upload className="w-4 h-4 inline mr-1" />
          업로드
          <input
            type="file"
            onChange={handleUpload}
            className="hidden"
            accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png"
          />
        </label>
      </div>

      <div className="space-y-3 max-h-48 overflow-y-auto">
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">{file.name}</h4>
              <p className="text-xs text-gray-500">{file.size} • {file.uploadDate}</p>
            </div>
            <button
              onClick={() => handleDownload(file)}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {files.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">공유된 자료가 없습니다</p>
        </div>
      )}
    </div>
  );
};

export default FileShare;
