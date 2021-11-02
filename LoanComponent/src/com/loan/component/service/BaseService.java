package com.loan.component.service;

import java.io.StringWriter;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.From;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.PluralJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import javax.persistence.metamodel.SingularAttribute;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;

import org.apache.log4j.Logger;
import org.hibernate.internal.SessionImpl;

import com.loan.common.util.CorrelatedQueryFilter;
import com.loan.common.util.CorrelatedSortField;
import com.loan.common.util.DateFilter;
import com.loan.common.util.FilterMode;
import com.loan.common.util.QueryFilter;
import com.loan.common.util.SortField;
import com.loan.common.util.UseLike;

public class BaseService {

  private static final Logger logger =
      Logger.getLogger(BaseService.class.getName());

  @PersistenceContext
  public EntityManager em;

  public void create(Object entity) {
    em.persist(entity);
    em.flush();
  }

  // Has fine control over the flush
  public <T> List<T> bulkCreate(List<T> entities, int frequency) {
    int size = entities.size();
    for (int i = 0; i < size; i++) {
      em.persist(entities.get(i));
      if (i % frequency == 0) {
        em.flush();
        em.clear();
      }
    }
    em.flush();
    return entities;
  }

  // By default it will flush every 100 records
  public <T> List<T> bulkCreate(List<T> entities) {
    bulkCreate(entities, 100);
    return entities;
  }

  // Has fine control over the flush
  public <T> List<T> bulkUpdate(List<T> entities, int frequency) {
    int size = entities.size();
    for (int i = 0; i < size; i++) {
      em.merge(entities.get(i));
      if (i % frequency == 0) {
        em.flush();
        em.clear();
      }
    }
    em.flush();
    return entities;
  }

  // By default it will flush every 100 records
  public <T> List<T> bulkUpdate(List<T> entities) {
    bulkUpdate(entities, 100);
    return entities;
  }

  public <T> T update(T entity) {
    entity = em.merge(entity);
    em.flush();
    return entity;
  }

  public <T> void delete(T entity) {
    em.remove(entity);
  }

  public <T> T findByPK(Class<T> clazz, Object id) {
    try {
      return em.find(clazz, id);
    }
    catch (NoResultException exception) {
      return null;
    }
  }

  public void detach(Object obj) {
    em.detach(obj);;
  }

  /**
   * Query any entity by the name attribute and get a single result or null
   * 
   * 
   * public <EntityType extends HasName> EntityType findByName(Class<EntityType>
   * entityClass, String value) { return findByName(entityClass, "name", value);
   * }
   */
  public <EntityType> EntityType findByName(Class<EntityType> entityClass,
      String paramName, String paramValue) {
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<EntityType> query = cb.createQuery(entityClass);
    Root<EntityType> from = query.from(entityClass);
    Predicate p = cb.equal(from.get(paramName), paramValue);
    query.where(p);
    TypedQuery<EntityType> typedQuery = em.createQuery(query);
    try {
      return typedQuery.getSingleResult();
    }
    catch (NoResultException exception) {
      return null;
    }
  }

  public <T> T findNamedQueryResult(Class<T> clazz, String queryName,
      Map<String, Object> parameters) {
    TypedQuery<T> query = createTypedNamedQuery(clazz, queryName, parameters);
    T t = null;
    try {
      t = query.getSingleResult();
    }
    catch (NoResultException exception) {
      logger.info("NoResultException " + queryName);
    }
    return t;
  }

  public <T> List<T> findNamedQueryResultList(Class<T> clazz,
      String queryName) {
    Query query = em.createNamedQuery(queryName);
    List<T> t = null;
    try {
      t = query.getResultList();
    }
    catch (NoResultException exception) {
      logger.info("NoResultException " + queryName);
    }
    return t;
  }

  public <T> T findNamedQueryResult(Class<T> clazz, String queryName,
      Object... args) {

    TypedQuery<T> query = createTypedNamedQuery(clazz, queryName, args);
    T t = null;
    try {
      t = query.getSingleResult();
    }
    catch (NoResultException exception) {
      t = null;
      logger.info("NoResultException " + queryName);
    }
    return t;
  }

  public <T> List<T> findNamedQueryResultList(Class<T> clazz, String queryName,
      Object... args) {
    TypedQuery<T> query = createTypedNamedQuery(clazz, queryName, args);
    List<T> t = null;
    try {
      t = query.getResultList();
    }
    catch (NoResultException exception) {
      logger.info("NoResultException " + queryName);
    }
    return t;
  }

  private <T> TypedQuery<T> createTypedNamedQuery(Class<T> clazz, String name,
      Object... args) {
    TypedQuery<T> query = em.createNamedQuery(name, clazz);
    int length = args.length;
    for (int i = 0; i < length; i += 2) {
      query.setParameter((String) args[i], args[i + 1]);
    }
    return query;
  }

  protected <T> TypedQuery<T> createTypedNamedQuery(Class<T> clazz, String name,
      Map<String, Object> parameters) {
    TypedQuery<T> query = em.createNamedQuery(name, clazz);
    if (parameters != null && !parameters.isEmpty()) {
      for (String paramName : parameters.keySet()) {
        query.setParameter(paramName, parameters.get(paramName));
      }
    }
    return query;
  }

  public <T> List<T> listNamedQueryResult(Class<T> clazz, String queryName,
      Map<String, Object> parameters) {
    TypedQuery<T> query = createTypedNamedQuery(clazz, queryName, parameters);
    return query.getResultList();
  }

  public <T> List<T> listNamedQueryResult(Class<T> clazz, String queryName,
      Map<String, Object> parameters, int resultSize) {
    TypedQuery<T> query = createTypedNamedQuery(clazz, queryName, parameters);
    return query.setMaxResults(resultSize).getResultList();
  }

  public <T> List<T> listNamedQueryResult(Class<T> clazz, String queryName) {
    TypedQuery<T> query =
        createTypedNamedQuery(clazz, queryName, (Map<String, Object>) null);
    return query.getResultList();
  }

  public <T> List<T> listNamedQueryResult(Class<T> clazz, String queryName,
      Object... args) {

    TypedQuery<T> query = createTypedNamedQuery(clazz, queryName, args);
    return query.getResultList();
  }

  public <T> List<T> listAll(Class<T> clazz) {
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<T> query = cb.createQuery(clazz);
    query.select(query.from(clazz));
    return em.createQuery(query).getResultList();
  }

  public static <T> T instantiate(Class<T> myclass) {
    try {
      return myclass.newInstance();
    }
    catch (Exception e) {
      throw e instanceof RuntimeException ? (RuntimeException) e
          : new IllegalStateException("Invalid class.", e);
    }
  }

  @SuppressWarnings("unchecked")
  public <T> T executeFunction(String functionName) {
    Query q = em.createNativeQuery(functionName);
    return (T) q.getSingleResult();
  }

  public <T> T createEntity(T entity) {
    em.persist(entity);
    em.flush();
    // em.detach(entity);
    return entity;
  }

  /**
   * Gets all of the given class with filter applied.
   * 
   * @param clazz The class to find
   * @param filter The filter
   * @return the matches
   */
  public <T> List<T> getResultsPerPage(Class<T> clazz, QueryFilter filter) {
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<T> query = cb.createQuery(clazz);
    Root<T> from = query.from(clazz);
    return getResultsPerPage(query, from, null, filter);
  }


  /**
   * Gets all of the given class with filter applied.
   * 
   * @param query a starting query
   * @param from the root of the query
   * @param p a pre-existing predicate to concatenate to
   * @param filter the filter
   * @param freeTextPaths paths that any given free text from the filter will be
   *        applied to
   * @return the matches
   */
  @SuppressWarnings({"unchecked"})
  public <ResultType, T, X> List<ResultType> getResultsPerPage(
      CriteriaQuery<ResultType> query, Root<T> from, Predicate p,
      QueryFilter filter) {

    List<SortField> sortFields = filter.getSortFields();
    int orderSize = sortFields.size();
    if (orderSize > 0) {
      CriteriaBuilder cb = em.getCriteriaBuilder();
      Order[] orders = new Order[orderSize];
      for (int i = 0; i < orderSize; i++) {
        SortField sortField = sortFields.get(i);
        if (sortField instanceof CorrelatedSortField) {
          CorrelatedSortField<X> cfield = (CorrelatedSortField<X>) sortField;
          Join<T, X> join =
              from.<T, X>join(cfield.getJoinPath(), JoinType.LEFT);

          Predicate equal = cb.equal(getPath(join, cfield.getFieldPath()),
              cfield.getFieldValue());
          if (p == null) {
            p = equal;
          }
          else {
            p = cb.and(p, equal);
          }
          if (sortField.isAscending()) {
            orders[i] = cb.asc(cb.least(getPath(join, cfield.getValuePath())));
          }
          else {
            orders[i] =
                cb.desc(cb.greatest(getPath(join, cfield.getValuePath())));
          }
          List<Expression<?>> groupBy = groupByFix(from);
          query.groupBy(groupBy);
        }
        else if (sortField.isAscending()) {
          orders[i] = cb.asc(getPath(from, sortField.getFieldPath()));
        }
        else {
          orders[i] = cb.desc(getPath(from, sortField.getFieldPath()));
        }
      }
      query.orderBy(orders);
    }
    applyPredicate(query, from, p, filter);

    TypedQuery<ResultType> typedQuery = em.createQuery(query);
    if (filter.getMaxResults() > 0) {
      typedQuery.setMaxResults(filter.getMaxResults());
    }
    typedQuery.setFirstResult(filter.getOffset());

    return typedQuery.getResultList();

  }

  protected <T> Path<String> getPath(Path<T> from, String path) {
    Path<String> returnPath = null;
    if (path != null && from != null) {
      logger.info("path:  " + path);
      StringTokenizer st = new StringTokenizer(path, ".");

      while (st.hasMoreTokens()) {
        String token = st.nextToken();
        if (returnPath == null) {
          if (from.get(token).getJavaType().getName().equals("java.util.Date")) {
            return (Path<String>)from;
          }
          returnPath = from.get(token);
          if (returnPath.getJavaType().getName().equals("java.util.Set")) {
            String newPath = path.substring(token.length() + 1);
            logger.info("newPath:  " + newPath);
            if (newPath != null && newPath.trim().length() > 0) {
              Join<?, ?> currentFrom = ((From<?, ?>) from).joinSet(token);
              returnPath = getPath(currentFrom, newPath);
              break;
            }
          }

          if (returnPath.getJavaType().getName().equals("java.util.List")) {
            String newPath = path.substring(token.length() + 1);
            logger.info("newPath:  " + newPath);
            if (newPath != null && newPath.trim().length() > 0) {
              Join<?, ?> currentFrom = ((From<?, ?>) from).joinList(token);
              returnPath = getPath(currentFrom, newPath);
              break;
            }
          }
        }
        else {
          returnPath = returnPath.get(token);
        }
      }
    }
    return returnPath;
  }

  protected <T> List<Expression<?>> groupByFix(Root<T> from) {

    javax.persistence.metamodel.EntityType<T> model = from.getModel();
    // We should be able to just call query.groupBy(from) but this only adds
    // the
    // id attribute
    // so we need the meta model to get all of the attributes so we can do a
    // full group by
    // the group by is required so we don't get duplicates when there is
    // more
    // than one
    // value associated in the correlated join - which would result in
    // getting
    // less
    // than a page full of data.
    Set<SingularAttribute<? super T, ?>> attributes =
        model.getSingularAttributes();
    List<Expression<?>> groupBy =
        new ArrayList<Expression<?>>(attributes.size());
    for (SingularAttribute<? super T, ?> a : attributes) {
      groupBy.add(from.get(a));
    }

    return groupBy;
  }

  @SuppressWarnings("unused")
  private <T, ResultType> void applyPredicate(CriteriaQuery<ResultType> query,
      Root<T> from, Predicate p, QueryFilter filter) {
    List<Predicate> fieldPredicates = new ArrayList<Predicate>();
    List<Predicate> joinPredicates = new ArrayList<Predicate>();
    List<Predicate> datePredicates = new ArrayList<Predicate>();
    List<Predicate> orPredicates = new ArrayList<Predicate>();
    List<Predicate> inPredicates = new ArrayList<Predicate>();
    List<Predicate> notNullPredicates = new ArrayList<Predicate>();
    List<Predicate> nullPredicates = new ArrayList<Predicate>();

    CriteriaBuilder cb = em.getCriteriaBuilder();
    Join<T, T> jj = null;
    Predicate prj = null;
    if (p == null) {
      p = cb.conjunction();
    }
    String freeText = filter.getFreeText();
    String[] freeTextPaths = filter.getFreeTextPaths();
    if (freeText != null && freeTextPaths != null && freeTextPaths.length > 0
        && freeText.length() > 0) {
      Predicate disjunction = cb.disjunction();
      for (String path : freeTextPaths) {
        disjunction = cb.or(disjunction, addFilterForValue(cb,
            getPath(from, path), freeText, true, FilterMode.INCLUDE.getName()));
      }
      p = cb.and(p, disjunction);
    }
    if (filter.getFieldFilters().size() > 0) {
      /*
       * p = predicateForNonUsageParams(p, filter.getFieldFilters(), cb, from,
       * filter.isUseLike());
       */
      fieldPredicates = predicateForConjunction(p, filter.getFieldFilters(), cb,
          from, filter.isUseLike());
    }
    if (filter.getNotNullFilters().size() > 0) {
      notNullPredicates = notNullPredicate(p, filter.getNotNullFilters(), cb,
          from, filter.isUseLike());
    }
    if (filter.getNullFilters().size() > 0) {
      nullPredicates = nullPredicate(p, filter.getNullFilters(), cb, from,
          filter.isUseLike());
    }

    if (filter.getOrFilters().size() > 0) {

      orPredicates = predicateForOrConjunction(p, filter.getOrFilters(), cb,
          from, filter.isUseLike());
    }
    if (filter.getInFilters().size() > 0) {

      inPredicates = predicateForInConjunction(p, filter.getInFilters(), cb,
          from, filter.isUseLike());
    }
    if (filter.getExcludeFieldFilters().size() > 0) {
      p = predicateForExcludeFilter(p, filter.getExcludeFieldFilters(), cb,
          from, filter.isUseLike());
    }
    if (filter.getDateFilters().size() > 0) {
      // p = predicateForFromAndToDate(p, filter.getDateFilters(), cb, from);

      datePredicates = predicateForDate(filter.getDateFilters(), cb, from);
    }

    List<CorrelatedQueryFilter> correlatedFilters =
        filter.getCorrelatedFilters();
    for (CorrelatedQueryFilter cFilter : correlatedFilters) {
      Map<String, Object> usageParams = cFilter.getFieldFilters();
      if (usageParams != null && usageParams.size() > 0) {
        Subquery<?> subquery = subQuery(query, from, cFilter.getJoinField(),
            cFilter.getNamePath(), cFilter.getValuePath(), cb, usageParams);
        p = cb.and(p, cb.exists(subquery));
      }
    }

    if (null != filter.getJoinFilters() && 0 < filter.getJoinFilters().size()) {

      joinPredicates =
          predicateForJoin(p, filter.getJoinFilters(), cb, from, false);

    }

    Predicate join =
        cb.and(joinPredicates.toArray(new Predicate[joinPredicates.size()]));
    Predicate date = null;
    Predicate field = null;
    Predicate notNull = null;
    Predicate isNull = null;
    Predicate or = null;
    Predicate in = null;

    if (null != datePredicates && datePredicates.size() > 0) {
      date =
          cb.and(datePredicates.toArray(new Predicate[datePredicates.size()]));
    }

    if (null != fieldPredicates && fieldPredicates.size() > 0) {

      if (filter.isAndOperator()) {
        field = cb.and(
            fieldPredicates.toArray(new Predicate[fieldPredicates.size()]));
      }
      else {
        field = cb.disjunction();
        field = cb
            .or(fieldPredicates.toArray(new Predicate[fieldPredicates.size()]));
      }
    }
    if (null != notNullPredicates && notNullPredicates.size() > 0) {
      if (filter.isAndOperator()) {
        notNull = cb.and(
            notNullPredicates.toArray(new Predicate[notNullPredicates.size()]));
      }
      else {
        notNull = cb.disjunction();
        notNull = cb.or(
            notNullPredicates.toArray(new Predicate[notNullPredicates.size()]));
      }
    }

    if (null != nullPredicates && nullPredicates.size() > 0) {
      if (filter.isAndOperator()) {
        isNull = cb
            .and(nullPredicates.toArray(new Predicate[nullPredicates.size()]));
      }
      else {
        isNull = cb.disjunction();
        isNull =
            cb.or(nullPredicates.toArray(new Predicate[nullPredicates.size()]));
      }
    }

    if (null != orPredicates && orPredicates.size() > 0) {

      if (filter.isAndOperator()) {
        or = cb.and(orPredicates.toArray(new Predicate[orPredicates.size()]));
      }
      else {
        or = cb.disjunction();
        or = cb.or(orPredicates.toArray(new Predicate[orPredicates.size()]));
      }
    }
    if (null != inPredicates && inPredicates.size() > 0) {

      if (filter.isAndOperator()) {
        in = cb.and(inPredicates.toArray(new Predicate[inPredicates.size()]));
      }
      else {
        in = cb.disjunction();
        in = cb.or(inPredicates.toArray(new Predicate[inPredicates.size()]));
      }
    }


    if (null != date) {

      if (filter.isAndOperator()) {
        p = cb.and(p, date);
      }
      else {
        p = cb.disjunction();
        p = cb.or(p, date);
      }
    }


    if (null != field) {

      if (filter.isAndOperator()) {
        p = cb.and(p, field);
      }
      else {
        p = cb.disjunction();
        p = cb.or(p, field);
      }
    }

    if (null != notNull) {
      if (filter.isAndOperator()) {
        p = cb.and(p, notNull);
      }
      else {
        p = cb.disjunction();
        p = cb.or(p, notNull);
      }
    }
    if (null != isNull) {
      if (filter.isAndOperator()) {
        p = cb.and(p, isNull);
      }
      else {
        p = cb.disjunction();
        p = cb.or(p, isNull);
      }
    }

    if (null != or) {

      if (filter.isAndOperator()) {
        p = cb.and(p, or);
      }
      else {
        p = cb.disjunction();
        p = cb.or(p, or);
      }
    }
    if (null != in) {

      if (filter.isAndOperator()) {
        p = cb.and(p, in);
      }
      else {
        p = cb.disjunction();
        p = cb.or(p, in);
      }
    }

    /*
     * if(null != date && null != field){ if(filter.isAndOperator()){ p =
     * cb.and(date, field); }else{ p = cb.or(date, field); } }else if(null !=
     * date){ p = cb.and(date); }else if(null != field){ p = cb.and(field); }
     */


    if (filter.isDistinct()) {
      query.where(join, p).distinct(true);
    }
    else {
      query.where(join, p);
    }

  }



  private <T, S> Subquery<S> subQuery(CriteriaQuery<?> query, Root<T> root,
      String joinField, String namePath, String valuePath, CriteriaBuilder cb,
      Map<String, Object> usageParams) {

    Class<?> javaType = root.getJavaType();
    Field field = null;
    // Try to get the join field type
    while (javaType != null) {
      try {
        field = javaType.getDeclaredField(joinField);
        break;
      }
      catch (NoSuchFieldException nsfe) {
        javaType = javaType.getSuperclass();
      }
      catch (Exception e) {
        throw new IllegalStateException(
            "Can't acccess " + joinField + " for query.");
      }
    }
    if (field == null) {
      throw new IllegalStateException(
          "Can't acccess " + joinField + " for query.");
    }
    ParameterizedType genericType = (ParameterizedType) field.getGenericType();
    Subquery<S> subquery =
        makeSubQuery(query, genericType.getActualTypeArguments()[0]);
    Root<T> sroot = subquery.correlate(root);
    Join<T, S> aov = sroot.<T, S>join(joinField);
    subquery.select(aov);
    Path<String> name = getPath(aov, namePath);
    Path<String> value = getPath(aov, valuePath);
    // Predicate pr = cb.equal(name, paramName);

    Predicate pr = null;
    boolean firstTime = true;
    for (String paramName : usageParams.keySet()) {
      // String paramValue = (String) usageParams.get(paramName);
      @SuppressWarnings("unchecked")
      List<Object> paramValueList = (List<Object>) usageParams.get(paramName);
      String inclOrExc = (String) paramValueList.get(0);
      String textOrFormula = (String) paramValueList.get(1);
      Object paramValue = paramValueList.get(2);
      if (firstTime && usageParams.size() == 1) {
        // doing this so that it works for all of them using
        // CorrelatedQueryFilter filter.
        firstTime = false;
        /*
         * if (namePath.indexOf(".") != -1) { pr = cb.equal(name, paramName); //
         * Path<String> operator = null; if
         * (FilterMode.TEXT.getName().equals(textOrFormula)) { pr = cb.and(pr,
         * addFilterForValue(cb, value, paramValue, true, inclOrExc)); } } else
         * {
         */
        // Path<String> operator = null;
        if (FilterMode.TEXT.getName().equals(textOrFormula)) {
          pr = addFilterForValue(cb, value, paramValue, true, inclOrExc);
        }
        // }
      }
      else {
        value = getPath(aov, paramName);
        if (FilterMode.TEXT.getName().equals(textOrFormula)) {
          if (pr != null) {
            pr = cb.and(pr,
                addFilterForValue(cb, value, paramValue, true, inclOrExc));
          }
          else {
            pr = addFilterForValue(cb, value, paramValue, true, inclOrExc);
          }
        }
      }
    }
    subquery.where(pr);

    return subquery;
  }

  private <S> Subquery<S> makeSubQuery(CriteriaQuery<?> query, Type t) {

    @SuppressWarnings("unchecked")
    Subquery<S> subquery = query.subquery((Class<S>) t);

    return subquery;
  }

  private Predicate addFilterForValue(CriteriaBuilder cb, Path<?> path,
      Object value, Boolean useLike, String inclOrExc) {

    Predicate valuePr = null;
    Class<?> javaType = path.getJavaType();
    boolean isString = String.class.isAssignableFrom(javaType);
    if (value.toString().contains(",")) {
      String params[] = value.toString().split(",");
      cb.disjunction();
      for (int cnt = 0; cnt < params.length; cnt++) {
        String param = params[cnt].replace('*', '%');
        if (param != null && param.trim().length() > 0) {
          param = param.trim();
          valuePr = prForText(valuePr, cb, path, param, useLike, inclOrExc,
              javaType, isString);
        }
      }
    }
    else {
      if (!(value instanceof Date)) {
        value = value.toString().replace('*', '%');
      }
      valuePr = prForText(valuePr, cb, path, value, useLike, inclOrExc,
          javaType, isString);
    }
    if (valuePr != null && FilterMode.EXCLUDE.getName().equals(inclOrExc)) {
      valuePr = cb.isNull(path);// cb.or(valuePr, cb.isNull(path));
    }

    return valuePr;
  }

  @SuppressWarnings("unchecked")
  private Predicate prForText(Predicate valuePr, CriteriaBuilder cb,
      Path<?> path, Object paramValue, Boolean useLike, String inclOrExc,
      Class<?> javaType, boolean isString) {

    // Generate the predicate for Text mode, include or exclude.
    String param = paramValue.toString();
    if (valuePr == null) {
      if (useLike && isString)
        valuePr = (FilterMode.INCLUDE.getName().equals(inclOrExc)
            ? cb.like((Path<String>) path, param)
            : cb.notLike((Path<String>) path, param));
      else if (javaType.isEnum()) {
        valuePr = (FilterMode.INCLUDE.getName().equals(inclOrExc)
            ? cb.equal(path, convertToType(javaType, param, useLike))
            : cb.notEqual(path, convertToType(javaType, param, useLike)));
      }
      else {
        Expression<String> as;
        Date date = null;
        if (Date.class.isAssignableFrom(javaType)) {
          as = (Path<String>) path;
          date = (Date) paramValue;
        }
        else if (String.class.isAssignableFrom(javaType)) {
          as = (Path<String>) path;
        }
        else {
          as = cb.function("to_char", String.class, path);
          // cast(field as char) in mysql is equivalent to to_char()
          // in oracle
          // This Expression is used to generate cast function of
          // mysql
          // as = new CastFunctionExpression<String>(cb,
          // (Path<String>) path);
        }
        if (useLike && !Date.class.isAssignableFrom(javaType)) {
          valuePr = (FilterMode.INCLUDE.getName().equals(inclOrExc)
              ? cb.like(as, param) : cb.notLike(as, param));
        }
        else {
          if (FilterMode.INCLUDE.getName().equals(inclOrExc)) {
            if (date != null) {
              Calendar dateCalendar = Calendar.getInstance();
              dateCalendar.setTime(date);
              valuePr = cb.and(
                  cb.equal(cb.function("year", Integer.class, as),
                      dateCalendar.get(Calendar.YEAR)),
                  cb.equal(cb.function("month", Integer.class, as),
                      dateCalendar.get(Calendar.MONTH) + 1),
                  cb.equal(cb.function("day", Integer.class, as),
                      dateCalendar.get(Calendar.DATE)));
            }
            else {
              valuePr = cb.equal(as, param);
            }
          }
          else {
            valuePr = cb.notEqual(as, date != null ? date : param);
          }
        }
      }
    }
    else {
      if (useLike && isString) {
        valuePr = (FilterMode.INCLUDE.getName().equals(inclOrExc)
            ? cb.or(valuePr, cb.like((Path<String>) path, param))
            : cb.and(valuePr, cb.notLike((Path<String>) path, param)));
      }
      else if (javaType.isEnum()) {
        valuePr = (FilterMode.INCLUDE.getName().equals(inclOrExc)
            ? cb.or(valuePr,
                cb.equal(path, convertToType(javaType, param, useLike)))
            : cb.and(valuePr,
                cb.notEqual(path, convertToType(javaType, param, useLike))));
      }
      else {
        Expression<String> as;
        Date date = null;
        if (Date.class.isAssignableFrom(javaType)) {
          as = (Path<String>) path;
          date = (Date) paramValue;
        }
        else if (String.class.isAssignableFrom(javaType)) {
          as = (Path<String>) path;
        }
        else {
          as = cb.function("to_char", String.class, path);
          // cast(field as char) in mysql is equivalent to to_char()
          // in oracle
          // This Expression is used to generate cast function of
          // mysql
          // as = new CastFunctionExpression<String>(cb,
          // (Path<String>) path);
        }
        if (useLike && !Date.class.isAssignableFrom(javaType)) {
          valuePr = (FilterMode.INCLUDE.getName().equals(inclOrExc)
              ? cb.or(valuePr, cb.like(as, param))
              : cb.and(valuePr, cb.notLike(as, param)));
        }
        else {
          valuePr = (FilterMode.INCLUDE.getName().equals(inclOrExc)
              ? cb.or(valuePr, cb.equal(as, date != null ? date : param))
              : cb.and(valuePr, cb.notEqual(as, date != null ? date : param)));
        }
      }
    }

    return valuePr;
  }

  private Object convertToType(Class<?> javaType, String value,
      boolean useLike) {

    if (javaType.isEnum()) {
      for (Object o : javaType.getEnumConstants()) {
        if (useLike && value.contains("%")) {
          String reg;

          reg = value.replace("%", ".*");

          boolean matches = Pattern.compile(reg, Pattern.CASE_INSENSITIVE)
              .matcher(((Enum<?>) o).name()).matches();
          if (matches) {
            return o;
          }
        }
        else {
          if (((Enum<?>) o).name().equalsIgnoreCase(value)) {
            return o;
          }
        }
      }
    }
    // Give up

    return null;
  }

  @SuppressWarnings("unused")
  private <T> Predicate predicateForNonUsageParams(Predicate p,
      Map<String, Object> parameters, CriteriaBuilder cb, Root<T> from,
      boolean useLike) {
    for (String paramName : parameters.keySet()) {
      Object paramValue = parameters.get(paramName);

      Path<String> id = getPath(from, paramName);
      if (paramValue instanceof String || paramValue instanceof Date) {
        p = cb.and(p, addFilterForValue(cb, id, paramValue, useLike,
            FilterMode.INCLUDE.getName()));
      }
      else {
        p = cb.and(p, cb.equal(id, parameters.get(paramName)));
      }
    }
    return p;
  }

  @SuppressWarnings("unused")
  private <T> List<Predicate> predicateForConjunction(Predicate p,
      Map<String, Object> parameters, CriteriaBuilder cb, Root<T> from,
      boolean useLike) {
    final List<Predicate> andPredicates = new ArrayList<Predicate>();

    for (String paramName : parameters.keySet()) {
      Object paramValue = parameters.get(paramName);

      Path<String> id = getPath(from, paramName);
      if (paramValue instanceof String || paramValue instanceof Date) {
        andPredicates.add(addFilterForValue(em.getCriteriaBuilder(), id,
            paramValue, useLike, FilterMode.INCLUDE.getName()));

      }
      else {
        andPredicates.add(cb.equal(id, parameters.get(paramName)));
      }
    }

    return andPredicates;
  }

  private <T> List<Predicate> notNullPredicate(Predicate p,
      Map<String, Object> dataMap, CriteriaBuilder cb, Root<T> from,
      boolean useLike) {
    final List<Predicate> notNullPredicates = new ArrayList<Predicate>();
    if (dataMap.size() > 0) {
      Path<String> column = null;
      Predicate predicate = null;
      for (String key : dataMap.keySet()) {
        Object paramValue = dataMap.get(key);
        column = getPath(from, key);
        if (null != dataMap.get(key)) {
          if (paramValue instanceof String || paramValue instanceof Date) {
            predicate = addFilterForValue(em.getCriteriaBuilder(), column,
                paramValue, useLike, FilterMode.INCLUDE.getName());
          }
          else {
            predicate = cb.equal(column, dataMap.get(key));
          }
          predicate = cb.or(predicate, cb.isNotNull(column));
        }
        else {
          predicate = cb.isNotNull(column);
        }
        notNullPredicates.add(predicate);
      }
    }

    return notNullPredicates;
  }


  private <T> List<Predicate> nullPredicate(Predicate p,
      Map<String, Object> dataMap, CriteriaBuilder cb, Root<T> from,
      boolean useLike) {
    final List<Predicate> nullPredicates = new ArrayList<Predicate>();
    if (dataMap.size() > 0) {
      Path<String> column = null;
      Predicate predicate = null;
      for (String key : dataMap.keySet()) {
        Object paramValue = dataMap.get(key);
        column = getPath(from, key);
        if (null != dataMap.get(key)) {
          if (paramValue instanceof String || paramValue instanceof Date) {
            predicate = addFilterForValue(em.getCriteriaBuilder(), column,
                paramValue, useLike, FilterMode.INCLUDE.getName());
          }
          else {
            predicate = cb.equal(column, dataMap.get(key));
          }
          predicate = cb.or(predicate, cb.isNull(column));
        }
        else {
          predicate = cb.isNull(column);
        }
        nullPredicates.add(predicate);
      }
    }
    return nullPredicates;
  }


  private <T> List<Predicate> predicateForOrConjunction(Predicate p,
      List<Map<String, Object>> parameters, CriteriaBuilder cb, Root<T> from,
      boolean useLike) {

    final List<Predicate> andPredicates = new ArrayList<Predicate>();

    for (Object andParamName : parameters) {
      final List<Predicate> orPredicates = new ArrayList<Predicate>();

      @SuppressWarnings("unchecked")
      Map<String, Object> paramMap = (HashMap<String, Object>) andParamName;

      for (String orParamName : paramMap.keySet()) {

        Object paramValue = paramMap.get(orParamName);

        Path<String> id = getPath(from, orParamName);
        if (paramValue instanceof String || paramValue instanceof Date) {
          orPredicates.add(addFilterForValue(
              em.getCriteriaBuilder(), id, (useLike == true
                  ? UseLike.convertUseLike(paramValue) : paramValue),
              useLike, FilterMode.INCLUDE.getName()));
        }
        else {
          orPredicates.add(cb.equal(id, paramMap.get(orParamName)));
        }
      }

      andPredicates
          .add(cb.or(orPredicates.toArray(new Predicate[orPredicates.size()])));
    }
    return andPredicates;
  }


  private <T> List<Predicate> predicateForInConjunction(Predicate p,
      Map<String, List<Object>> parameters, CriteriaBuilder cb, Root<T> from,
      boolean useLike) {

    final List<Predicate> andPredicates = new ArrayList<Predicate>();
    for (Entry<String, List<Object>> paramMap : parameters.entrySet()) {
      String paramName = paramMap.getKey();
      final List<Predicate> orPredicates = new ArrayList<Predicate>();
      for (Object paramValue : paramMap.getValue()) {
        Object o = paramValue;
        Path<String> id = getPath(from, paramName);
        if (paramValue instanceof String || paramValue instanceof Object) {
          orPredicates.add(addFilterForValue(
              em.getCriteriaBuilder(), id, (useLike == true
                  ? UseLike.convertUseLike(paramValue) : paramValue),
              useLike, FilterMode.INCLUDE.getName()));
        }
        else {
          orPredicates.add(cb.equal(id, paramName));
        }
      }

      andPredicates
          .add(cb.or(orPredicates.toArray(new Predicate[orPredicates.size()])));
    }
    return andPredicates;
  }

  private <T> List<Predicate> predicateForDate(List<DateFilter> dateFilters,
      CriteriaBuilder cb, Root<T> from) {
    final List<Predicate> datePredicates = new ArrayList<Predicate>();
    Map<String, Path<String>> trackPath = new HashMap<String, Path<String>>(); 
    for (DateFilter dateFilter : dateFilters) {
      String keyPath = null;
      String paramName = dateFilter.getParamName();
      Object paramValue = dateFilter.getParamValue();
      StringTokenizer st = new StringTokenizer(paramName, ".");
      for (int i = 1; st.countTokens()>i;i++) {
        keyPath = st.nextToken();
        paramName = st.nextToken();
      }
      Path<String> current = null;
      if(trackPath.containsKey(keyPath)){
        current = trackPath.get(keyPath);
      }else{
        current = getPath(from, dateFilter.getParamName());
        trackPath.put(keyPath, current);
      }
      
      if (paramValue instanceof Date) {
        if (dateFilter.getFilterMode().equals(FilterMode.FromDate)) {

          datePredicates.add(cb.greaterThanOrEqualTo(
              current.<Date>get(paramName), (Date) paramValue));

        }
        else if (dateFilter.getFilterMode().equals(FilterMode.ToDate)) {

          datePredicates.add(cb.lessThanOrEqualTo(
              current.<Date>get(paramName), (Date) paramValue));
        }
        else if (dateFilter.getFilterMode().equals(FilterMode.EQUAL)) {

          datePredicates.add(cb.equal(current.<Date>get(paramName),
              (Date) paramValue));
        }
      }
    }
    return datePredicates;
  }



  @SuppressWarnings("unused")
  private <T> List<Predicate> predicateForJoin(Predicate p,
      Map<String, Object> parameters, CriteriaBuilder cb, Root<T> from,
      boolean useLike) {
    final List<Predicate> joinPredicates = new ArrayList<Predicate>();

    for (String paramName : parameters.keySet()) {
      Object paramValue = parameters.get(paramName);

      Path<String> id = getPath(from, paramName);
      if (paramValue instanceof String || paramValue instanceof Date) {
        joinPredicates.add(addFilterForValue(em.getCriteriaBuilder(), id,
            paramValue, useLike, FilterMode.INCLUDE.getName()));

      }
      else {
        joinPredicates.add(cb.equal(id, parameters.get(paramName)));
      }
    }
    return joinPredicates;
  }



  public <T> Predicate predicateForExcludeFilter(Predicate p,
      Map<String, Object> parameters, CriteriaBuilder cb, Root<T> from,
      boolean useLike) {
    for (String paramName : parameters.keySet()) {
      Object paramValue = parameters.get(paramName);

      Path<String> id = getPath(from, paramName);
      if (paramValue instanceof String) {
        p = cb.and(p, addFilterForValue(cb, id, (String) paramValue, useLike,
            FilterMode.EXCLUDE.getName()));
      }
      else {
        p = cb.and(p, cb.notEqual(id, parameters.get(paramName)));
      }
    }
    return p;
  }

  private <T> Predicate predicateForFromAndToDate(Predicate p,
      List<DateFilter> dateFilters, CriteriaBuilder cb, Root<T> from) {
    for (DateFilter dateFilter : dateFilters) {
      Object paramValue = dateFilter.getParamValue();
      if (paramValue instanceof Date) {
        if (dateFilter.getFilterMode().equals(FilterMode.FromDate)) {
          p = cb.and(p, cb.greaterThanOrEqualTo(
              from.<Date>get(dateFilter.getParamName()), (Date) paramValue));
        }
        else if (dateFilter.getFilterMode().equals(FilterMode.ToDate)) {
          p = cb.and(p, cb.lessThan(from.<Date>get(dateFilter.getParamName()),
              (Date) paramValue));
        }
      }
    }
    return p;
  }

  /**
   * Gets size of results with filter applied.
   * 
   * @param clazz The class to find
   * @param filter The filter
   * @return the total count
   */
  public <T> Long getResultsSize(Class<T> clazz, QueryFilter filter) {


    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<Long> query = cb.createQuery(Long.class);

    Root<T> from = query.from(clazz);
    return getResultsSize(query, from, null, filter);

  }

  /**
   * Gets size of results with filter applied.
   * 
   * @param query a starting query
   * @param from the root of the query
   * @param p a pre-existing predicate to concatenate to
   * @param filter the filter
   * @return the total count
   */
  public <T> Long getResultsSize(CriteriaQuery<Long> query, Root<T> from,
      Predicate p, QueryFilter filter) {
    if (filter.isDistinct()) {
      query.select(em.getCriteriaBuilder().countDistinct(from));
    }
    else {
      query.select(em.getCriteriaBuilder().count(from));
    }
    applyPredicate(query, from, p, filter);
    return em.createQuery(query).getSingleResult();

  }

  public boolean validateName(String name) {
    String pattern = "[0-9a-zA-Z]*";
    Matcher m = Pattern.compile(pattern).matcher(name);
    return m.matches();
  }

  public boolean validateRoleName(String name) {
    String pattern = "[0-9a-zA-Z -]*";
    Matcher m = Pattern.compile(pattern).matcher(name);
    return m.matches();
  }

  /*
   * public String getLoggedInUser() { return new
   * AuditListener().getLoggedUserId(); }
   */

  public Connection getConnection() {
    Connection connection = null;
    try {
      connection = em.unwrap(SessionImpl.class).connection().getMetaData()
          .getConnection();;
    }
    catch (SQLException e) {
      logger.error(e.getMessage(), e);
    }
    return connection;
  }

  public <T> List<T> listAll(Class<T> clazz, String col) {
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<T> query = cb.createQuery(clazz);
    Root<T> c = query.from(clazz);
    query.orderBy(cb.asc(c.get(col)));
    return em.createQuery(query).getResultList();
  }


  public Object getQuerySingleResult(Query query) {
    try {
      return query.getSingleResult();
    }
    catch (NoResultException exception) {
      return null;
    }
  }

  @SuppressWarnings("rawtypes")
  public List getQueryResultList(Query query) {
    try {
      return query.getResultList();
    }
    catch (NoResultException exception) {
      return null;
    }
  }

  @SuppressWarnings("unused")
  public <T> String ObjectToXMLString(Class<T> c, T obj) {

    try {
      JAXBContext detail_ctx = JAXBContext.newInstance(c);
      Marshaller m = detail_ctx.createMarshaller();
      StringWriter sw = new StringWriter();
      m.marshal(obj, sw);
      return sw.toString();
    }
    catch (Exception e) {
      return null;
    }
  }



}
