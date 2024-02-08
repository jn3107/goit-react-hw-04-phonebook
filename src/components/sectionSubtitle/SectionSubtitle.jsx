import css from "./SectionSubtitle.module.css";

const SectionSubtitle = ({ subtitle, children }) => {
    return (
        <div>
            <section className={css.section}>
                <h1 className={css.subtitle}>{subtitle}</h1>
                {children}
            </section>
        </div>
    );
};

export { SectionSubtitle };