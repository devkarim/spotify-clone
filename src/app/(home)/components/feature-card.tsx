import Card from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, subtitle }) => {
  return (
    <Card className="w-full sm:w-96 min-h-[9rem] flex flex-col justify-between p-6 gap-4 hover:bg-section-card-active transition-colors select-none">
      <div className="space-y-3">
        <div className="items-center flex gap-2">
          <span className="text-2xl">{icon}</span>
          <h4 className="text-xl font-bold">{title}</h4>
        </div>
        <p className="font-semibold opacity-60">{subtitle}</p>
      </div>
    </Card>
  );
};

export default FeatureCard;
