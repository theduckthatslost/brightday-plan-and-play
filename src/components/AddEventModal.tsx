import { useState } from 'react';
import { X, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { EventType, EVENT_TYPE_CONFIG } from '@/types';
import { useEvents } from '@/hooks/useEvents';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEventModal = ({ isOpen, onClose }: AddEventModalProps) => {
  const { addEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'personal' as EventType,
  });

  const [showOptional, setShowOptional] = useState(false);
  const [optionalData, setOptionalData] = useState({
    description: '',
    location: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title, date, and time.",
        variant: "destructive",
      });
      return;
    }

    // Add event
    addEvent({
      title: formData.title.trim(),
      description: optionalData.description.trim(),
      date: formData.date,
      time: formData.time,
      location: optionalData.location.trim(),
      type: formData.type,
      emoji: EVENT_TYPE_CONFIG[formData.type].emoji,
    });

    toast({
      title: "Event Added! 🎉",
      description: `${formData.title} has been scheduled.`,
    });

    // Reset form and close modal
    setFormData({
      title: '',
      date: '',
      time: '',
      type: 'personal',
    });
    setOptionalData({
      description: '',
      location: '',
    });
    setShowOptional(false);
    onClose();
  };

  const handleTypeChange = (type: EventType) => {
    setFormData(prev => ({ ...prev, type }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-sm bg-white border-0 shadow-xl rounded-t-3xl animate-slide-up">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary">Quick Add</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="btn-bounce rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="What's the plan?"
                className="text-lg py-3 border-2 rounded-xl shadow-sm"
                autoFocus
              />
            </div>

            {/* Event Type */}
            <div>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(EVENT_TYPE_CONFIG).map(([key, config]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleTypeChange(key as EventType)}
                    className={cn(
                      'p-3 rounded-xl border-2 transition-all duration-200 btn-bounce shadow-sm',
                      formData.type === key
                        ? 'border-primary bg-primary/10 shadow-md'
                        : 'border-border hover:border-primary/50 bg-white'
                    )}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-lg">{config.emoji}</span>
                      <span className="text-xs font-medium">{config.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-muted-foreground mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="border-2 rounded-xl shadow-sm"
                />
              </div>
              
              <div>
                <Label htmlFor="time" className="text-sm font-medium text-muted-foreground mb-2 block">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="border-2 rounded-xl shadow-sm"
                />
              </div>
            </div>

            {/* Optional Fields Toggle */}
            {!showOptional && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowOptional(true)}
                className="w-full text-muted-foreground hover:text-primary"
              >
                + Add location or description
              </Button>
            )}

            {/* Optional Fields */}
            {showOptional && (
              <div className="space-y-3 p-3 bg-muted/30 rounded-xl">
                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-muted-foreground">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={optionalData.location}
                    onChange={(e) => setOptionalData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Where is it?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-muted-foreground">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={optionalData.description}
                    onChange={(e) => setOptionalData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Any details?"
                    className="mt-1"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOptional(false)}
                  className="text-muted-foreground"
                >
                  Hide optional fields
                </Button>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 btn-bounce rounded-xl shadow-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground btn-bounce rounded-xl shadow-md"
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