import Card from "./card";
import InfoRow from "./info-row";

export default function ResumeSummary() {
  return (
    <Card title="Resume Summary">
      <div className="space-y-3">
        <InfoRow label="Name" value="Tun Lin Naine" />
        <InfoRow label="Education" value="UMass Amherst - Computer Science" />
        <InfoRow label="Experience" value="2 internships detected" />
      </div>
    </Card>
  );
}
