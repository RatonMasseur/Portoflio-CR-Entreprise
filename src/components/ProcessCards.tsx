import { useRef } from 'react';
import { useScroll, useTransform, motion, type MotionValue } from 'motion/react';

const steps = [
  {
    tag: 'Étape 01',
    title: 'Échange',
    description: "On discute de votre activité, vos clients cibles, ce que vous voulez mettre en avant. 30 minutes suffisent.",
    details: ['Appel découverte gratuit', 'Cahier des charges simple', 'Devis sous 24h'],
    bg: '#0f0d0a',
    num: '01',
  },
  {
    tag: 'Étape 02',
    title: 'Maquette',
    description: "Je vous présente une maquette complète du site. On ajuste ensemble jusqu'à ce que ce soit parfait.",
    details: ['Maquette Figma interactive', 'Révisions illimitées', 'Validation avant développement'],
    bg: '#0d1420',
    num: '02',
  },
  {
    tag: 'Étape 03',
    title: 'Développement',
    description: "Je code le site à la main, optimise le SEO, configure l'hébergement. Vous ne touchez à rien.",
    details: ['Code propre & performant', 'SEO technique inclus', 'Tests mobile & desktop'],
    bg: '#0b1626',
    num: '03',
  },
  {
    tag: 'Étape 04',
    title: 'Mise en ligne',
    description: 'Votre site est en ligne. Je vous forme en 30 minutes à gérer votre contenu — et je reste disponible.',
    details: ['Déploiement & DNS', 'Formation contenu incluse', 'Support 3 mois offert'],
    bg: '#09182e',
    num: '04',
  },
];

interface CardProps {
  i: number;
  step: typeof steps[0];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({ i, step, progress, range, targetScale }: CardProps) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0 }}
    >
      <motion.div
        style={{
          backgroundColor: step.bg,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          position: 'relative',
          width: '100%',
          maxWidth: '768px',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          transformOrigin: 'top center',
        }}
      >
        {/* Header */}
        <div style={{ padding: '28px 48px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{
            display: 'block',
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'rgba(91,150,245,0.65)',
            marginBottom: '6px',
          }}>
            {step.tag}
          </span>
          <h3 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.2,
          }}>
            {step.title}
          </h3>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 48px 40px', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem', color: 'rgba(255,255,255,0.55)' }}>
            {step.description}
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
            {step.details.map((d) => (
              <li key={d} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(91,150,245,0.6)', flexShrink: 0 }} />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative number */}
        <div style={{
          position: 'absolute',
          right: '-12px',
          bottom: '-24px',
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(100px, 16vw, 180px)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          color: 'rgba(91,150,245,0.06)',
        }}>
          {step.num}
        </div>
      </motion.div>
    </div>
  );
}

export default function ProcessCards() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container} style={{ height: `${steps.length * 100}vh` }}>
      {steps.map((step, i) => {
        const targetScale = 1 - (steps.length - i) * 0.05;
        return (
          <Card
            key={step.num}
            i={i}
            step={step}
            progress={scrollYProgress}
            range={[i * (1 / steps.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
