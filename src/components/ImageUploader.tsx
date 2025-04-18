import React, { useState, useRef, DragEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Upload, Link, Image, X } from 'lucide-react';
import buildUrl from '@/app/helpers/buildURL';

interface ImageUploaderProps {
    imageUrl: string;
    onImageChange: (image: File | string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUrl, onImageChange }) => {
  
  if (imageUrl !== '/placeholder.svg') {
    imageUrl = buildUrl(imageUrl);
  }
  const [isUrlMode, setIsUrlMode] = useState(!!imageUrl && imageUrl !== '/placeholder.svg');

  const getValidImageUrl = (url: string) => {
    return url && url !== '/placeholder.svg' ? buildUrl(url) : null;
  };

  const [imagePreview, setImagePreview] = useState<string | null>(getValidImageUrl(imageUrl));
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const validUrl = getValidImageUrl(imageUrl);
    setImagePreview(validUrl);
    setIsUrlMode(!!validUrl);
  }, [imageUrl]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    const url = e.target.value;
    onImageChange(url);
    setImagePreview(url || null);
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) {
      alert('O tamanho máximo de arquivo é 5MB.');
      return;
    }
    debugger;
  
    setImagePreview(URL.createObjectURL(file)); // mostra preview
    onImageChange(file); // envia o File pro componente pai
  };
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUrlMode) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (!isUrlMode && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    debugger;

    setImagePreview(null);
    onImageChange('/placeholder.svg');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Imagem do Post
        </label>
        <div className="flex items-center space-x-2">
          <Upload size={16} className={!isUrlMode ? 'text-blue-500' : 'text-gray-400'} />
          <Switch
            checked={isUrlMode}
            onCheckedChange={setIsUrlMode}
            id="image-mode"
          />
          <Link size={16} className={isUrlMode ? 'text-blue-500' : 'text-gray-400'} />
          <Label htmlFor="image-mode" className="text-sm">
            {isUrlMode ? 'URL da imagem' : 'Upload de arquivo'}
          </Label>
        </div>
      </div>

      {isUrlMode ? (
        <Input
          type="url"
          placeholder="https://exemplo.com/imagem.jpg"
          value={imageUrl !== '/placeholder.svg' ? imageUrl : ''}
          onChange={handleUrlChange}
        />
      ) : (
        <div className="flex items-center space-x-2">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="flex-1"
          />
        </div>
      )}

      {imagePreview && (
        <div className="relative mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Preview:</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearImage}
              className="text-red-500 hover:bg-red-50"
            >
              <X size={16} className="mr-1" /> Remover
            </Button>
          </div>
          <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview da imagem"
              className="w-full h-full object-cover"
              onError={() => {
                if (isUrlMode) {
    debugger;

                  setImagePreview(null);
                }
              }}
            />
          </div>
        </div>
      )}

      {!imagePreview && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex items-center justify-center aspect-video rounded-md border-2 border-dashed cursor-pointer ${
            dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-100'
          }`}
        >
          <div className="text-center p-6">
            <Image className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              {isUrlMode
                ? 'Insira a URL de uma imagem'
                : 'Arraste uma imagem ou clique para selecionar'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
