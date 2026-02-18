-- Create contact_messages table with type field for both contact and newsletter
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) DEFAULT 'contact' NOT NULL, -- 'contact' or 'newsletter'
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT check_contact_fields CHECK (
    type = 'newsletter' OR (name IS NOT NULL AND subject IS NOT NULL AND message IS NOT NULL)
  )
);

-- Create index for faster queries
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_type ON contact_messages(type);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (submit contact form or newsletter)
CREATE POLICY "Allow anyone to submit contact form" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all contact messages (for admin)
CREATE POLICY "Allow authenticated users to view contact messages" ON contact_messages
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update contact messages (for admin)
CREATE POLICY "Allow authenticated users to update contact messages" ON contact_messages
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete contact messages (for admin)
CREATE POLICY "Allow authenticated users to delete contact messages" ON contact_messages
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
