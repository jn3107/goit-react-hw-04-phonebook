import css from "./SectionTitle.module.css";

const SectionTitle = ({ title, children }) => {
    return (
        <div>
            <section className={css.section}>
                <h1 className={css.title}>{title}</h1>
                {children}
            </section>
        </div>
    );
};

export { SectionTitle };