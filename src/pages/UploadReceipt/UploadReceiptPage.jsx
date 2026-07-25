import { useState } from 'react';
import { HiOutlineCloudUpload, HiOutlinePhotograph } from 'react-icons/hi';
import { Card, Button } from '../../components/ui';

/**
 * UploadReceiptPage — Page for uploading receipt images for AI processing.
 * Placeholder UI — file upload logic will be added later.
 */
const UploadReceiptPage = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Upload Receipt</h1>
        <p className="mt-1 text-text-secondary">
          Upload your receipts and let AI extract the details automatically.
        </p>
      </div>

      {/* Upload Area */}
      <Card padding="lg">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all duration-200 ${
            isDragOver
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <HiOutlineCloudUpload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-text-primary">
            Drop your receipt here
          </h3>
          <p className="mb-6 text-sm text-text-secondary">
            or click to browse — supports JPG, PNG, PDF
          </p>
          <Button variant="primary">
            <HiOutlinePhotograph className="mr-2 h-4 w-4" />
            Choose File
          </Button>
        </div>
      </Card>

      {/* Recent Uploads Placeholder */}
      <Card>
        <Card.Header>
          <Card.Title>Recent Uploads</Card.Title>
        </Card.Header>
        <div className="flex h-32 items-center justify-center">
          <p className="text-text-muted">No receipts uploaded yet. Start by uploading one above!</p>
        </div>
      </Card>
    </div>
  );
};

export default UploadReceiptPage;
