import { useState } from 'react';
import { X, Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { EventType, EVENT_TYPE_CONFIG } from '@/types';
import { useEvents } from '@/hooks/useEvents';
import { cn } from '@/lib/utils';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMOJI_OPTIONS = [
  '💼', '📚', '☕', '🧘‍♀️', '🎯', '🏃‍♀️', '🍕', '🎬', '🎵', '💡',
  '🌟', '🎨', '📱', '💻', '🏠', '🚗', '✈️', '🏖️', '🎉', '🎂'
];

const AddEventModal = ({ isOpen, onClose }: AddEventModalProps) => {
  const { addEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'personal' as EventType,
    emoji: '📅',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add event
    addEvent({
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: formData.date,
      time: formData.time,
      location: formData.location.trim(),
      type: formData.type,
      emoji: formData.emoji,
    });

    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'personal',
      emoji: '📅',
    });
    setErrors({});
    onClose();
  };

  const handleTypeChange = (type: EventType) => {
    setFormData(prev => ({
      ...prev,
      type,
      emoji: EVENT_TYPE_CONFIG[type].emoji,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl animate-bounce-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">Add New Event</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="btn-bounce"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium">
                Event Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Team meeting"
                className={cn(errors.title && 'border-destructive')}
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title}</p>
              )}
            </div>

            {/* Event Type */}
            <div>
              <Label className="text-sm font-medium">Event Type</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(EVENT_TYPE_CONFIG).map(([key, config]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleTypeChange(key as EventType)}
                    className={cn(
                      'p-3 rounded-xl border-2 transition-all duration-200 btn-bounce',
                      formData.type === key
                        ? `border-primary bg-${key}/20`
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{config.emoji}</span>
                      <span className="text-sm font-medium">{config.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji Picker */}
            <div>
              <Label className="text-sm font-medium">Choose Emoji</Label>
              <div className="grid grid-cols-10 gap-2 mt-2">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, emoji }))}
                    className={cn(
                      'w-8 h-8 rounded-lg border-2 transition-all duration-200 btn-bounce',
                      formData.emoji === emoji
                        ? 'border-primary bg-primary/20'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-sm font-medium">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className={cn(errors.date && 'border-destructive')}
                />
                {errors.date && (
                  <p className="text-sm text-destructive mt-1">{errors.date}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="time" className="text-sm font-medium">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className={cn(errors.time && 'border-destructive')}
                />
                {errors.time && (
                  <p className="text-sm text-destructive mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-sm font-medium">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Conference Room A"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Add more details..."
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 btn-bounce"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white btn-bounce"
              >
                Add Event ✨
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddEventModal;