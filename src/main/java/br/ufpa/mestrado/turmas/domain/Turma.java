package br.ufpa.mestrado.turmas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Turma.
 */
@Entity
@Table(name = "turma")
public class Turma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numero")
    private String numero;

    @Column(name = "n_alunos")
    private Integer nAlunos;

    @OneToMany(mappedBy = "turma")
    @JsonIgnore
    private Set<Aluno> alunos = new HashSet<>();

    @ManyToMany(mappedBy = "turmas")
    @JsonIgnore
    private Set<Professor> professores = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public Turma numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Integer getnAlunos() {
        return nAlunos;
    }

    public Turma nAlunos(Integer nAlunos) {
        this.nAlunos = nAlunos;
        return this;
    }

    public void setnAlunos(Integer nAlunos) {
        this.nAlunos = nAlunos;
    }

    public Set<Aluno> getAlunos() {
        return alunos;
    }

    public Turma alunos(Set<Aluno> alunos) {
        this.alunos = alunos;
        return this;
    }

    public Turma addAlunos(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.setTurma(this);
        return this;
    }

    public Turma removeAlunos(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.setTurma(null);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        this.alunos = alunos;
    }

    public Set<Professor> getProfessores() {
        return professores;
    }

    public Turma professores(Set<Professor> professors) {
        this.professores = professors;
        return this;
    }

    public Turma addProfessores(Professor professor) {
        this.professores.add(professor);
        professor.getTurmas().add(this);
        return this;
    }

    public Turma removeProfessores(Professor professor) {
        this.professores.remove(professor);
        professor.getTurmas().remove(this);
        return this;
    }

    public void setProfessores(Set<Professor> professors) {
        this.professores = professors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Turma turma = (Turma) o;
        if (turma.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), turma.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Turma{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", nAlunos=" + getnAlunos() +
            "}";
    }
}
